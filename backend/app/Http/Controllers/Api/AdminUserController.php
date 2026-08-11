<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminUserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $users = User::query()
            ->select([
                'id',
                'name',
                'email',
                'role',
                'created_at',
                'updated_at',
            ])
            ->latest()
            ->paginate(
                $request->integer('per_page', 10)
            );

        return response()->json([
            'data' => AdminUserResource::collection($users),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(
        Request $request,
        User $user
    ): JsonResponse {
        $this->authorizeAdmin($request);

        $user->load([
            'profile',
            'experiences',
            'educations',
            'skills',
            'projects',
            'blogPosts',
            'certificates',
        ]);

        return response()->json([
            'data' => new AdminUserResource($user),
        ]);
    }

    /**
     * Update the specified user.
     *
     * Rules:
     * - Admin can update their own account.
     * - Admin can update normal users.
     * - Admin cannot update another administrator.
     */
    public function update(
        Request $request,
        User $user
    ): JsonResponse {
        $this->authorizeAdmin($request);

        $admin = $request->user();

        /**
         * Another administrator can only be viewed.
         * They cannot be modified by another admin.
         */
        if (
            $user->role === 'admin' &&
            $admin->id !== $user->id
        ) {
            return response()->json([
                'message' =>
                'You cannot modify another administrator.',
            ], 403);
        }

        /**
         * Only allow fields that this endpoint
         * is responsible for updating.
         *
         * Role is intentionally excluded.
         */
        $validated = $request->validate([
            'name' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users', 'email')
                    ->ignore($user->id),
            ],
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully.',
            'data' => new AdminUserResource(
                $user->fresh()
            ),
        ]);
    }

    /**
     * Change the role of a user.
     *
     * Rules:
     * - Admin cannot change their own role.
     * - Admin cannot change another administrator's role.
     * - Admin can promote a normal user to admin.
     */
    public function changeRole(
        Request $request,
        User $user
    ): JsonResponse {
        $this->authorizeAdmin($request);

        $admin = $request->user();

        /**
         * Admin cannot change their own role.
         */
        if ($admin->id === $user->id) {
            return response()->json([
                'message' =>
                'You cannot change your own role.',
            ], 403);
        }

        /**
         * Existing administrators cannot be modified.
         *
         * Admin -> User: forbidden
         * Admin -> Admin: unnecessary / forbidden
         */
        if ($user->role === 'admin') {
            return response()->json([
                'message' =>
                'Administrator role cannot be changed.',
            ], 403);
        }

        /**
         * The only allowed transition is:
         *
         * user -> admin
         */
        $validated = $request->validate([
            'role' => [
                'required',
                Rule::in(['admin']),
            ],
        ]);

        $user->update([
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' =>
            'User role updated successfully.',
            'data' => new AdminUserResource(
                $user->fresh()
            ),
        ]);
    }

    /**
     * Make sure the authenticated user is an admin.
     */
    private function authorizeAdmin(Request $request): void
    {
        $user = $request->user();

        if (!$user) {
            abort(
                401,
                'Unauthenticated.'
            );
        }

        if ($user->role !== 'admin') {
            abort(
                403,
                'Forbidden.'
            );
        }
    }
}

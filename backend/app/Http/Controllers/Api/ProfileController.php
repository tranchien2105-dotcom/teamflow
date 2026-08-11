<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Create profile for authenticated user.
     */
    public function store(
        StoreProfileRequest $request
    ): JsonResponse {
        $user = $request->user();

        if ($user->profile) {
            return response()->json([
                'message' => 'Profile already exists.',
            ], 409);
        }

        $profile = $user->profile()->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Profile created successfully.',
            'profile' => $profile,
        ], 201);
    }

    /**
     * Update profile of authenticated user.
     */
    public function update(
        UpdateProfileRequest $request
    ): JsonResponse {
        $user = $request->user();

        $profile = $user->profile;

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found.',
            ], 404);
        }

        $profile->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Profile updated successfully.',
            'profile' => $profile->fresh(),
        ]);
    }
}
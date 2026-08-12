<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Filesystem\FilesystemAdapter;

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

        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar_url'] = $request->file('avatar')
                ->store('avatars', 'public');
        }

        if ($request->hasFile('cv')) {
            $data['cv_url'] = $request->file('cv')
                ->store('cvs', 'public');
        }

        unset(
            $data['avatar'],
            $data['cv']
        );

        $profile = $user->profile()->create($data);

        return response()->json([
            'message' => 'Profile created successfully.',
            'profile' => $this->transformProfile($profile),
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

        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            if ($profile->avatar_url) {
                Storage::disk('public')->delete(
                    $profile->avatar_url
                );
            }

            $data['avatar_url'] = $request->file('avatar')
                ->store('avatars', 'public');
        }

        if ($request->hasFile('cv')) {
            if ($profile->cv_url) {
                Storage::disk('public')->delete(
                    $profile->cv_url
                );
            }

            $data['cv_url'] = $request->file('cv')
                ->store('cvs', 'public');
        }

        unset(
            $data['avatar'],
            $data['cv']
        );

        $profile->update($data);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'profile' => $this->transformProfile(
                $profile->fresh()
            ),
        ]);
    }

    /**
     * Transform profile file paths into public URLs.
     */
    private function transformProfile($profile)
    {
        /** @var FilesystemAdapter $disk */
        $disk = Storage::disk('public');

        $profile->avatar_url = $profile->avatar_url
            ? $disk->url($profile->avatar_url)
            : null;

        $profile->cv_url = $profile->cv_url
            ? $disk->url($profile->cv_url)
            : null;

        return $profile;
    }
}

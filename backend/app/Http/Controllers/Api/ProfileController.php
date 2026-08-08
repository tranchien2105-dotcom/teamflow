<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->profile) {
            return response()->json(
                [
                    "message" => "Profile already exists.",
                ],
                409
            );
        }

        $validated = $request->validate([
            "full_name" => ["nullable", "string", "max:255"],
            "title" => ["nullable", "string", "max:255"],
            "bio" => ["nullable", "string"],
            "avatar_url" => ["nullable", "url", "max:255"],
            "cv_url" => ["nullable", "url", "max:255"],
            "phone" => ["nullable", "string", "max:50"],
            "address" => ["nullable", "string", "max:255"],
            "github_url" => ["nullable", "url", "max:255"],
            "linkedin_url" => ["nullable", "url", "max:255"],
            "website_url" => ["nullable", "url", "max:255"],
        ]);

        $profile = $user->profile()->create($validated);

        return response()->json(
            [
                "message" => "Profile created successfully.",
                "profile" => $profile,
            ],
            201
        );
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $profile = $user->profile;

        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile not found.",
                ],
                404
            );
        }

        $validated = $request->validate([
            "full_name" => ["nullable", "string", "max:255"],
            "title" => ["nullable", "string", "max:255"],
            "bio" => ["nullable", "string"],
            "avatar_url" => ["nullable", "url", "max:255"],
            "cv_url" => ["nullable", "url", "max:255"],
            "phone" => ["nullable", "string", "max:50"],
            "address" => ["nullable", "string", "max:255"],
            "github_url" => ["nullable", "url", "max:255"],
            "linkedin_url" => ["nullable", "url", "max:255"],
            "website_url" => ["nullable", "url", "max:255"],
        ]);

        $profile->update($validated);

        return response()->json([
            "message" => "Profile updated successfully.",
            "profile" => $profile->fresh(),
        ]);
    }
}

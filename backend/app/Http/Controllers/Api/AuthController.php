<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email hoặc mật khẩu không đúng'],
            ]);
        }

        $token = $user->createToken('teamflow')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }


    public function me(Request $request)
    {
        $user = $request->user()->load('profile');

        if ($user->profile) {
            /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
            $disk = Storage::disk('public');

            $user->profile->avatar_url = $user->profile->avatar_url
                ? $disk->url($user->profile->avatar_url)
                : null;

            $user->profile->cv_url = $user->profile->cv_url
                ? $disk->url($user->profile->cv_url)
                : null;
        }

        return response()->json([
            'user' => $user,
        ]);
    }
}

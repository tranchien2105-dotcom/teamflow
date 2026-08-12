<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    /**
     * Display the default portfolio.
     *
     * The default portfolio is currently Tran Minh Chien.
     */
    public function default(): JsonResponse
    {
        return $this->portfolio('tran-minh-chien');
    }

    /**
     * Display a public portfolio by username.
     */
    public function show(string $username): JsonResponse
    {
        return $this->portfolio($username);
    }

    /**
     * Get portfolio data for a specific username.
     */
    private function portfolio(string $username): JsonResponse
    {
        $user = User::query()
            ->where('username', $username)
            ->with([
                'profile',

                'experiences',

                'educations.school',

                'skills',

                'projects.features',
                'projects.images',
                'projects.technologies',
                'projects.links',

                'certificates',

                'blogPosts',
            ])
            ->firstOrFail();

        return response()->json([
            'data' => new PortfolioResource($user),
        ]);
    }
}
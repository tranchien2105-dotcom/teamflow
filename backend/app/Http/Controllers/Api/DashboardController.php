<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard overview for authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Statistics
        |--------------------------------------------------------------------------
        */

        $stats = [
            'experiences' => Experience::where(
                'user_id',
                $user->id
            )->count(),

            'educations' => Education::where(
                'user_id',
                $user->id
            )->count(),

            'skills' => Skill::where(
                'user_id',
                $user->id
            )->count(),

            'projects' => Project::where(
                'user_id',
                $user->id
            )->count(),

            'certificates' => Certificate::where(
                'user_id',
                $user->id
            )->count(),

            'blog_posts' => BlogPost::where(
                'user_id',
                $user->id
            )->count(),
        ];

        /*
        |--------------------------------------------------------------------------
        | Profile
        |--------------------------------------------------------------------------
        */

        $profile = Profile::where(
            'user_id',
            $user->id
        )->first();

        /*
        |--------------------------------------------------------------------------
        | Recent Experiences
        |--------------------------------------------------------------------------
        */

        $recentExperiences = Experience::where(
            'user_id',
            $user->id
        )
            ->orderByDesc('start_date')
            ->limit(3)
            ->get([
                'id',
                'company',
                'position',
                'location',
                'employment_type',
                'start_date',
                'end_date',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Featured Projects
        |--------------------------------------------------------------------------
        */

        $featuredProjects = Project::where(
            'user_id',
            $user->id
        )
            ->where('featured', true)
            ->orderByDesc('created_at')
            ->limit(4)
            ->get([
                'id',
                'title',
                'slug',
                'summary',
                'cover_image',
                'github_url',
                'demo_url',
                'featured',
                'status',
                'started_at',
                'completed_at',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Recent Projects
        |--------------------------------------------------------------------------
        */

        $recentProjects = Project::where(
            'user_id',
            $user->id
        )
            ->orderByDesc('created_at')
            ->limit(5)
            ->get([
                'id',
                'title',
                'slug',
                'summary',
                'cover_image',
                'featured',
                'status',
                'started_at',
                'completed_at',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Recent Blog Posts
        |--------------------------------------------------------------------------
        */

        $recentBlogPosts = BlogPost::where(
            'user_id',
            $user->id
        )
            ->orderByDesc('created_at')
            ->limit(5)
            ->get([
                'id',
                'title',
                'slug',
                'excerpt',
                'cover_image',
                'published_at',
                'created_at',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Recent Certificates
        |--------------------------------------------------------------------------
        */

        $recentCertificates = Certificate::where(
            'user_id',
            $user->id
        )
            ->orderByDesc('issue_date')
            ->limit(5)
            ->get([
                'id',
                'name',
                'organization',
                'credential_id',
                'issue_date',
                'credential_url',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],

                'profile' => $profile,

                'stats' => $stats,

                'recent_experiences' => $recentExperiences,

                'featured_projects' => $featuredProjects,

                'recent_projects' => $recentProjects,

                'recent_blog_posts' => $recentBlogPosts,

                'recent_certificates' => $recentCertificates,
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CvController extends Controller
{
    /**
     * Get all data required to build user's CV.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        $profile = Profile::where(
            'user_id',
            $user->id
        )->first();

        $skills = Skill::where(
            'user_id',
            $user->id
        )
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        $experiences = Experience::where(
            'user_id',
            $user->id
        )
            ->orderByDesc('start_date')
            ->get();

        $educations = Education::where(
            'user_id',
            $user->id
        )
            ->with('school')
            ->orderByDesc('start_date')
            ->get();

        $projects = Project::where(
            'user_id',
            $user->id
        )
            ->with([
                'features',
                'technologies',
                'links',
            ])
            ->orderByDesc('featured')
            ->orderByDesc('started_at')
            ->get();

        $certificates = Certificate::where(
            'user_id',
            $user->id
        )
            ->orderByDesc('issue_date')
            ->get();

        return response()->json([
            'profile' => $profile,
            'skills' => $skills,
            'experiences' => $experiences,
            'educations' => $educations,
            'projects' => $projects,
            'certificates' => $certificates,
        ]);
    }

    public function updateTemplate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'template' => [
                'required',
                'string',
                'in:classic,modern,minimal',
            ],
        ]);

        $user = $request->user();

        $profile = Profile::where(
            'user_id',
            $user->id
        )->first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found.',
            ], 404);
        }

        $profile->update([
            'cv_template' => $validated['template'],
        ]);

        return response()->json([
            'message' => 'CV template updated successfully.',
            'template' => $profile->cv_template,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectFeatureRequest;
use App\Http\Requests\UpdateProjectFeatureRequest;
use App\Models\Project;
use App\Models\ProjectFeature;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectFeatureController extends Controller
{
    public function index(
        Request $request,
        Project $project
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        $features = $project->features()->get();

        return response()->json([
            'data' => $features,
        ]);
    }

    public function store(
        StoreProjectFeatureRequest $request,
        Project $project
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        $feature = $project->features()->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Project feature created successfully.',
            'data' => $feature,
        ], 201);
    }

    public function update(
        UpdateProjectFeatureRequest $request,
        Project $project,
        ProjectFeature $feature
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        abort_unless(
            $feature->project_id === $project->id,
            404
        );

        $feature->update($request->validated());

        return response()->json([
            'message' => 'Project feature updated successfully.',
            'data' => $feature->fresh(),
        ]);
    }

    public function destroy(
        Request $request,
        Project $project,
        ProjectFeature $feature
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        abort_unless(
            $feature->project_id === $project->id,
            404
        );

        $feature->delete();

        return response()->json([
            'message' => 'Project feature deleted successfully.',
        ]);
    }
}
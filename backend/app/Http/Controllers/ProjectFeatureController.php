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
    /**
     * Display all features of a project.
     */
    public function index(
        Request $request,
        Project $project
    ): JsonResponse {
        $this->authorize('view', $project);

        $features = $project->features()->get();

        return response()->json([
            'data' => $features,
        ]);
    }

    /**
     * Store a new feature for a project.
     */
    public function store(
        StoreProjectFeatureRequest $request,
        Project $project
    ): JsonResponse {
        $this->authorize('update', $project);

        $feature = $project->features()->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Project feature created successfully.',
            'data' => $feature,
        ], 201);
    }

    /**
     * Update a project feature.
     */
    public function update(
        UpdateProjectFeatureRequest $request,
        Project $project,
        ProjectFeature $feature
    ): JsonResponse {
        $this->authorize('update', $project);

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

    /**
     * Delete a project feature.
     */
    public function destroy(
        Request $request,
        Project $project,
        ProjectFeature $feature
    ): JsonResponse {
        $this->authorize('delete', $project);

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
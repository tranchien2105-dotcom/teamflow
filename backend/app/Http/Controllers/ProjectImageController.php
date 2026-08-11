<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectImageRequest;
use App\Http\Requests\UpdateProjectImageRequest;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectImageController extends Controller
{
    public function index(
        Request $request,
        Project $project
    ): JsonResponse {
        $this->authorize('view', $project);

        return response()->json([
            'data' => $project->images()->get(),
        ]);
    }

    public function store(
        StoreProjectImageRequest $request,
        Project $project
    ): JsonResponse {
        $this->authorize('update', $project);

        $image = $project->images()->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Project image created successfully.',
            'data' => $image,
        ], 201);
    }

    public function update(
        UpdateProjectImageRequest $request,
        Project $project,
        ProjectImage $image
    ): JsonResponse {
        $this->authorize('update', $project);

        abort_unless(
            $image->project_id === $project->id,
            404
        );

        $image->update($request->validated());

        return response()->json([
            'message' => 'Project image updated successfully.',
            'data' => $image->fresh(),
        ]);
    }

    public function destroy(
        Request $request,
        Project $project,
        ProjectImage $image
    ): JsonResponse {
        $this->authorize('delete', $project);

        abort_unless(
            $image->project_id === $project->id,
            404
        );

        $image->delete();

        return response()->json([
            'message' => 'Project image deleted successfully.',
        ]);
    }
}
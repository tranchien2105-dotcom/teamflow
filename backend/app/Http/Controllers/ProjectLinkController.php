<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectLinkRequest;
use App\Http\Requests\UpdateProjectLinkRequest;
use App\Models\Project;
use App\Models\ProjectLink;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectLinkController extends Controller
{
    public function index(
        Request $request,
        Project $project
    ): JsonResponse {
        $this->authorize('view', $project);

        return response()->json([
            'data' => $project->links()->get(),
        ]);
    }

    public function store(
        StoreProjectLinkRequest $request,
        Project $project
    ): JsonResponse {
        $this->authorize('update', $project);

        $link = $project->links()->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Project link created successfully.',
            'data' => $link,
        ], 201);
    }

    public function update(
        UpdateProjectLinkRequest $request,
        Project $project,
        ProjectLink $link
    ): JsonResponse {
        $this->authorize('update', $project);

        abort_unless(
            $link->project_id === $project->id,
            404
        );

        $link->update($request->validated());

        return response()->json([
            'message' => 'Project link updated successfully.',
            'data' => $link->fresh(),
        ]);
    }

    public function destroy(
        Request $request,
        Project $project,
        ProjectLink $link
    ): JsonResponse {
        $this->authorize('delete', $project);

        abort_unless(
            $link->project_id === $project->id,
            404
        );

        $link->delete();

        return response()->json([
            'message' => 'Project link deleted successfully.',
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\SyncProjectTechnologyRequest;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $projects = Project::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => ProjectResource::collection($projects),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'per_page' => $projects->perPage(),
                'total' => $projects->total(),
            ],
        ]);
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = Project::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Project created successfully.',
            'data' => new ProjectResource($project),
        ], 201);
    }

    public function show(Request $request, Project $project): JsonResponse
    {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        $project->load([
            'features',
            'images',
            'links',
            'technologies',
        ]);

        return response()->json([
            'data' => new ProjectResource($project),
        ]);
    }
    public function update(
        UpdateProjectRequest $request,
        Project $project
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        $project->update($request->validated());

        return response()->json([
            'message' => 'Project updated successfully.',
            'data' => new ProjectResource($project->fresh()),
        ]);
    }

    public function destroy(
        Request $request,
        Project $project
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.',
        ]);
    }

    public function syncTechnologies(
        SyncProjectTechnologyRequest $request,
        Project $project
    ): JsonResponse {
        abort_unless(
            $project->user_id === $request->user()->id,
            404
        );

        if ($request->has('technology_ids')) {
            $project->technologies()->sync(
                $request->validated('technology_ids')
            );
        }

        return response()->json([
            'message' => 'Project technologies updated successfully.',
            'data' => $project->load('technologies'),
        ]);
    }
}

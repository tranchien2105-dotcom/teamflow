<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\SyncProjectTechnologyRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the user's projects.
     */
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

    /**
     * Store a newly created project.
     */
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

    /**
     * Display the specified project.
     */
    public function show(
        Request $request,
        Project $project
    ): JsonResponse {
        $this->authorize('view', $project);

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

    /**
     * Update the specified project.
     */
    public function update(
        UpdateProjectRequest $request,
        Project $project
    ): JsonResponse {
        $this->authorize('update', $project);

        $project->update($request->validated());

        return response()->json([
            'message' => 'Project updated successfully.',
            'data' => new ProjectResource($project->fresh()),
        ]);
    }

    /**
     * Remove the specified project.
     */
    public function destroy(
        Request $request,
        Project $project
    ): JsonResponse {
        $this->authorize('delete', $project);

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.',
        ]);
    }

    /**
     * Sync technologies for the specified project.
     */
    public function syncTechnologies(
        SyncProjectTechnologyRequest $request,
        Project $project
    ): JsonResponse {
        $this->authorize('update', $project);

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

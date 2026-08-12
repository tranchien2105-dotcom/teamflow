<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Experience::query();

        $experiences = $query
            ->where('user_id', $request->user()->id)
            ->latest('start_date')
            ->get()
            ->map(function ($experience) {
                return [
                    'id' => $experience->id,
                    'user_id' => $experience->user_id,
                    'company' => $experience->company,
                    'position' => $experience->position,
                    'location' => $experience->location,
                    'employment_type' => $experience->employment_type,
                    'start_date' => $experience->start_date?->format('Y-m-d'),
                    'end_date' => $experience->end_date?->format('Y-m-d'),
                    'description' => $experience->description,
                    'created_at' => $experience->created_at,
                    'updated_at' => $experience->updated_at,
                ];
            });

        return response()->json($experiences);
    }

    public function store(StoreExperienceRequest $request): JsonResponse
    {
        $experience = $request->user()
            ->experiences()
            ->create($request->validated());

        return response()->json($experience, 201);
    }

    public function show(
        Request $request,
        string $id
    ): JsonResponse {
        $experience = Experience::findOrFail($id);

        $this->authorize('view', $experience);

        return response()->json($experience);
    }

    public function update(
        UpdateExperienceRequest $request,
        string $id
    ): JsonResponse {
        $experience = Experience::findOrFail($id);

        $this->authorize('update', $experience);

        $experience->update(
            $request->validated()
        );

        return response()->json(
            $experience->fresh()
        );
    }

    public function destroy(
        Request $request,
        string $id
    ): JsonResponse {
        $experience = Experience::findOrFail($id);

        $this->authorize('delete', $experience);

        $experience->delete();

        return response()->json([
            'message' => 'Experience deleted successfully.',
        ]);
    }
}
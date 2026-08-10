<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTechnologyRequest;
use App\Http\Requests\UpdateTechnologyRequest;
use App\Models\Technology;
use Illuminate\Http\JsonResponse;

class TechnologyController extends Controller
{
    public function index(): JsonResponse
    {
        $technologies = Technology::query()
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $technologies,
        ]);
    }

    public function store(StoreTechnologyRequest $request): JsonResponse
    {
        $technology = Technology::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Technology created successfully.',
            'data' => $technology,
        ], 201);
    }

    public function show(Technology $technology): JsonResponse
    {
        return response()->json([
            'data' => $technology,
        ]);
    }

    public function update(
        UpdateTechnologyRequest $request,
        Technology $technology
    ): JsonResponse {
        $technology->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Technology updated successfully.',
            'data' => $technology->fresh(),
        ]);
    }

    public function destroy(Technology $technology): JsonResponse
    {
        $technology->delete();

        return response()->json([
            'message' => 'Technology deleted successfully.',
        ]);
    }
}
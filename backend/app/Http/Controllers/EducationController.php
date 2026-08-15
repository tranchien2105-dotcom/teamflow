<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EducationController extends Controller
{
    /**
     * Get educations.
     *
     * Admin: all users
     * User: authenticated user only
     */
    public function index(): AnonymousResourceCollection
    {
        $educations = request()
            ->user()
            ->educations()
            ->with('school')
            ->latest('start_date')
            ->get();

        return EducationResource::collection($educations);
    }

    /**
     * Create education for authenticated user.
     */
    public function store(
        StoreEducationRequest $request
    ): EducationResource {
        $education = $request
            ->user()
            ->educations()
            ->create($request->validated());

        $education->load('school');

        return new EducationResource($education);
    }

    /**
     * Get one education.
     */
    public function show(
        Education $education
    ): EducationResource {
        $this->authorize('view', $education);

        $education->load('school');

        return new EducationResource($education);
    }

    /**
     * Update education.
     */
    public function update(
        UpdateEducationRequest $request,
        Education $education
    ): EducationResource {
        $this->authorize('update', $education);

        $education->update(
            $request->validated()
        );

        $education->load('school');

        return new EducationResource($education);
    }

    /**
     * Delete education.
     */
    public function destroy(
        Education $education
    ): JsonResponse {
        $this->authorize('delete', $education);

        $education->delete();

        return response()->json([
            'message' => 'Education deleted successfully.',
        ]);
    }
}

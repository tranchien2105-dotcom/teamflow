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
     * Get authenticated user's educations.
     */
    public function index(): AnonymousResourceCollection
    {
        $educations = request()
            ->user()
            ->educations()
            ->with('school')
            ->latest('start_date')
            ->get();

        return EducationResource::collection(
            $educations
        );
    }

    /**
     * Create education.
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
        $this->authorizeEducation($education);

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
        $this->authorizeEducation($education);

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
        $this->authorizeEducation($education);

        $education->delete();

        return response()->json([
            'message' => 'Education deleted successfully.',
        ]);
    }

    /**
     * Make sure the education belongs
     * to the authenticated user.
     */
    private function authorizeEducation(
        Education $education
    ): void {
        abort_unless(
            $education->user_id === request()->user()->id,
            403,
            'Unauthorized.'
        );
    }
}
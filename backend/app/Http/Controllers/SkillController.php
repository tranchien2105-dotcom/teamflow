<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Get current user's skills.
     */
    public function index(
        Request $request
    ): JsonResponse {
        $skills = $request->user()
            ->skills()
            ->orderBy('years_of_experience','DESC')
            ->get();

        return response()->json($skills);
    }

    /**
     * Create a skill.
     */
    public function store(
        Request $request
    ): JsonResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'category' => [
                'required',
                'string',
                'in:Backend,Frontend,Database,DevOps,Testing,Tools,Other',
            ],

            'level' => [
                'required',
                'string',
                'in:Beginner,Intermediate,Advanced,Expert',
            ],

            'years_of_experience' => [
                'required',
                'integer',
                'min:0',
                'max:50',
            ],
        ]);

        $skill = $request->user()
            ->skills()
            ->create($validated);

        return response()->json(
            $skill,
            201
        );
    }

    /**
     * Get one skill.
     */
    public function show(
        Request $request,
        Skill $skill
    ): JsonResponse {
        $this->authorizeSkill(
            $request,
            $skill
        );

        return response()->json($skill);
    }

    /**
     * Update a skill.
     */
    public function update(
        Request $request,
        Skill $skill
    ): JsonResponse {
        $this->authorizeSkill(
            $request,
            $skill
        );

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'category' => [
                'required',
                'string',
                'in:Backend,Frontend,Database,DevOps,Testing,Tools,Other',
            ],

            'level' => [
                'required',
                'string',
                'in:Beginner,Intermediate,Advanced,Expert',
            ],

            'years_of_experience' => [
                'required',
                'integer',
                'min:0',
                'max:50',
            ],
        ]);

        $skill->update($validated);

        return response()->json(
            $skill->fresh()
        );
    }

    /**
     * Delete a skill.
     */
    public function destroy(
        Request $request,
        Skill $skill
    ): JsonResponse {
        $this->authorizeSkill(
            $request,
            $skill
        );

        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted successfully.',
        ]);
    }

    /**
     * Make sure the skill belongs
     * to the authenticated user.
     */
    private function authorizeSkill(
        Request $request,
        Skill $skill
    ): void {
        abort_unless(
            $skill->user_id === $request->user()->id,
            403
        );
    }
}
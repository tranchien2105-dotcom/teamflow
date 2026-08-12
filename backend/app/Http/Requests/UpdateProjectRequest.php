<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $project = $this->route('project');

        return [
            'title' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')
                    ->ignore($project->id),
            ],

            'summary' => [
                'nullable',
                'string',
            ],

            'content' => [
                'nullable',
                'string',
            ],

            'cover_image' => [
                'nullable',
                'file',
                'image',
                'mimes:jpeg,jpg,png,webp',
                'max:5120',
            ],

            'github_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'demo_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'featured' => [
                'nullable',
                'boolean',
            ],

            'status' => [
                'nullable',
                'string',
                'in:draft,active,archived,completed',
            ],

            'started_at' => [
                'nullable',
                'date',
            ],

            'completed_at' => [
                'nullable',
                'date',
                'after_or_equal:started_at',
            ],
        ];
    }
}

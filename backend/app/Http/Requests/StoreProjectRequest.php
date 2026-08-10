<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:projects,slug'],

            'summary' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],

            'cover_image' => ['nullable', 'string', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],

            'featured' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string', 'in:draft,active,archived,completed'],

            'started_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date', 'after_or_equal:started_at'],
        ];
    }
}
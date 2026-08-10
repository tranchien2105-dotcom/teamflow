<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        if (!$this->filled('slug') && $this->filled('title')) {
            $this->merge([
                'slug' => Str::slug($this->input('title')),
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:blog_posts,slug',
            ],

            'excerpt' => [
                'nullable',
                'string',
            ],

            'content' => [
                'nullable',
                'string',
            ],

            'cover_image' => [
                'nullable',
                'string',
                'max:255',
            ],

            'published_at' => [
                'nullable',
                'date',
            ],
        ];
    }
}

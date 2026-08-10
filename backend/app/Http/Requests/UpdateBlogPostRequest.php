<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        if (
            $this->filled('title') &&
            !$this->filled('slug')
        ) {
            $this->merge([
                'slug' => Str::slug($this->input('title')),
            ]);
        }
    }

    public function rules(): array
    {
        $blogPostId = $this->route('blog_post')->id;

        return [
            'title' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('blog_posts', 'slug')->ignore($blogPostId),
            ],

            'excerpt' => [
                'sometimes',
                'nullable',
                'string',
            ],

            'content' => [
                'sometimes',
                'nullable',
                'string',
            ],

            'cover_image' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'published_at' => [
                'sometimes',
                'nullable',
                'date',
            ],
        ];
    }
}

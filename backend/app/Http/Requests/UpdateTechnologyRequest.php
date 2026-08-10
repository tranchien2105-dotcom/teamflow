<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTechnologyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $technology = $this->route('technology');

        return [
            'name' => ['sometimes', 'string', 'max:255'],

            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('technologies', 'slug')
                    ->ignore($technology->id),
            ],

            'icon' => ['nullable', 'string', 'max:255'],
        ];
    }
}
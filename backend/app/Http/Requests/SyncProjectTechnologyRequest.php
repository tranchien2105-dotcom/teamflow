<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SyncProjectTechnologyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'technology_ids' => ['sometimes', 'array'],
            'technology_ids.*' => [
                'uuid',
                'exists:technologies,id',
            ],
        ];
    }
}

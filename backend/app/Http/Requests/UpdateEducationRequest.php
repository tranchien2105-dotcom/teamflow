<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'school_id' => [
                'required',
                'integer',
                'exists:schools,id',
            ],

            'degree' => [
                'required',
                'string',
                'max:255',
            ],

            'field_of_study' => [
                'required',
                'string',
                'max:255',
            ],

            'start_date' => [
                'required',
                'date',
            ],

            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ];
    }
}
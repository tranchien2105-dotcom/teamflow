<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'organization' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'credential_id' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'issue_date' => [
                'sometimes',
                'nullable',
                'date',
            ],

            'credential_url' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'description' => [
                'sometimes',
                'nullable',
                'string',
            ],
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCertificateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'organization' => [
                'nullable',
                'string',
                'max:255',
            ],

            'credential_id' => [
                'nullable',
                'string',
                'max:255',
            ],

            'issue_date' => [
                'nullable',
                'date',
            ],

            'credential_url' => [
                'nullable',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ];
    }
}

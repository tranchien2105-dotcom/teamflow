<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:255'],
            'type' => ['nullable', 'string', 'max:50'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
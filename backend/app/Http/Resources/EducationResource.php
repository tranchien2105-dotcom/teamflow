<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,

            'school' => [
                'id' => (string) $this->school->id,
                'name' => $this->school->name,
                'short_name' => $this->school->short_name,
                'location' => $this->school->location,
            ],

            'degree' => $this->degree,

            'field_of_study' => $this->field_of_study,

            'start_date' => $this->start_date?->format('Y-m-d'),

            'end_date' => $this->end_date?->format('Y-m-d'),

            'description' => $this->description,
        ];
    }
}
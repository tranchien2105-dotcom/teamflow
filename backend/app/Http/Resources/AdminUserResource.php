<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'profile' => $this->whenLoaded('profile'),

            'experiences' => $this->whenLoaded('experiences'),

            'educations' => $this->whenLoaded('educations'),

            'skills' => $this->whenLoaded('skills'),

            'projects' => $this->whenLoaded('projects'),

            'blog_posts' => $this->whenLoaded('blogPosts'),

            'certificates' => $this->whenLoaded('certificates'),
        ];
    }
}
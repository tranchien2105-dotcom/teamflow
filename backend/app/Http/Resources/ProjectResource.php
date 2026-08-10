<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'content' => $this->content,

            'cover_image' => $this->cover_image,
            'github_url' => $this->github_url,
            'demo_url' => $this->demo_url,

            'featured' => $this->featured,
            'status' => $this->status,

            'started_at' => $this->started_at?->format('Y-m-d'),
            'completed_at' => $this->completed_at?->format('Y-m-d'),

            'features' => ProjectFeatureResource::collection(
                $this->whenLoaded('features')
            ),

            'images' => ProjectImageResource::collection(
                $this->whenLoaded('images')
            ),

            'technologies' => TechnologyResource::collection(
                $this->whenLoaded('technologies')
            ),

            'links' => ProjectLinkResource::collection(
                $this->whenLoaded('links')
            ),

            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}

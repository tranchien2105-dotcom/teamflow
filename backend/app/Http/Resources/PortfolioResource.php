<?php

namespace App\Http\Resources;

use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var FilesystemAdapter $disk */
        $disk = Storage::disk('public');

        return [
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
                'username' => $this->username,
            ],

            'profile' => $this->whenLoaded('profile', function () use ($disk) {
                return [
                    'id' => $this->profile->id,
                    'full_name' => $this->profile->full_name,
                    'title' => $this->profile->title,
                    'bio' => $this->profile->bio,

                    'avatar_url' => $this->profile->avatar_url
                        ? $disk->url($this->profile->avatar_url)
                        : null,

                    'cv_url' => $this->profile->cv_url
                        ? $disk->url($this->profile->cv_url)
                        : null,

                    'github_url' => $this->profile->github_url,
                    'linkedin_url' => $this->profile->linkedin_url,
                    'website_url' => $this->profile->website_url,
                ];
            }),

            'experiences' => $this->whenLoaded('experiences', function () {
                return $this->experiences->map(function ($experience) {
                    return [
                        'id' => $experience->id,
                        'company' => $experience->company,
                        'position' => $experience->position,
                        'location' => $experience->location,
                        'employment_type' => $experience->employment_type,
                        'start_date' => $experience->start_date?->format('Y-m-d'),
                        'end_date' => $experience->end_date?->format('Y-m-d'),
                        'description' => $experience->description,
                    ];
                });
            }),

            'skills' => $this->whenLoaded('skills', function () {
                return $this->skills->map(function ($skill) {
                    return [
                        'id' => $skill->id,
                        'name' => $skill->name,
                        'category' => $skill->category,
                        'level' => $skill->level,
                        'years_of_experience' => $skill->years_of_experience,
                    ];
                });
            }),

            'educations' => EducationResource::collection(
                $this->whenLoaded('educations')
            ),

            'projects' => ProjectResource::collection(
                $this->whenLoaded('projects')
            ),

            'certificates' => CertificateResource::collection(
                $this->whenLoaded('certificates')
            ),

            'blog_posts' => BlogPostResource::collection(
                $this->whenLoaded('blogPosts')
            ),
        ];
    }
}
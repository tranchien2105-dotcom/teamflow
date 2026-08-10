<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'summary',
        'content',
        'cover_image',
        'github_url',
        'demo_url',
        'featured',
        'status',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'started_at' => 'date',
        'completed_at' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function features(): HasMany
    {
        return $this->hasMany(ProjectFeature::class)
            ->orderBy('sort_order');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)
            ->orderBy('sort_order');
    }
    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(
            Technology::class,
            'project_technology'
        );
    }

    public function links(): HasMany
    {
        return $this->hasMany(ProjectLink::class)
            ->orderBy('sort_order');
    }
}

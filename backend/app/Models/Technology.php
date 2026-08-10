<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Technology extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'slug',
        'icon',
    ];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(
            Project::class,
            'project_technology'
        );
    }
}
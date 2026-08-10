<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProjectFeature extends Model
{
    use HasUuids;
    protected $fillable = [
        'project_id',
        'title',
        'description',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
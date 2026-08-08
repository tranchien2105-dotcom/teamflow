<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'full_name',
        'title',
        'bio',
        'avatar_url',
        'cv_url',
        'phone',
        'address',
        'github_url',
        'linkedin_url',
        'website_url',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'location',
    ];

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }
}
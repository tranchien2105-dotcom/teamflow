<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'organization',
        'credential_id',
        'issue_date',
        'credential_url',
        'description',
    ];

    protected $casts = [
        'issue_date' => 'date',
    ];

    /**
     * Certificate belongs to a user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

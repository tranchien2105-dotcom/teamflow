<?php

namespace App\Policies;

use App\Models\Profile;
use App\Models\User;

class ProfilePolicy
{
    public function view(User $user, Profile $profile): bool
    {
        return $user->role === 'admin'
            || $profile->user_id === $user->id;
    }

    public function update(User $user, Profile $profile): bool
    {
        return $user->role === 'admin'
            || $profile->user_id === $user->id;
    }

    public function delete(User $user, Profile $profile): bool
    {
        return $user->role === 'admin'
            || $profile->user_id === $user->id;
    }
}
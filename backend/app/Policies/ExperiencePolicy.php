<?php

namespace App\Policies;

use App\Models\Experience;
use App\Models\User;

class ExperiencePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Experience $experience): bool
    {
        return $user->role === 'admin'
            || $experience->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Experience $experience): bool
    {
        return $user->role === 'admin'
            || $experience->user_id === $user->id;
    }

    public function delete(User $user, Experience $experience): bool
    {
        return $user->role === 'admin'
            || $experience->user_id === $user->id;
    }
}
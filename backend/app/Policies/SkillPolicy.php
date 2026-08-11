<?php

namespace App\Policies;

use App\Models\Skill;
use App\Models\User;

class SkillPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Skill $skill): bool
    {
        return $user->role === 'admin'
            || $skill->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Skill $skill): bool
    {
        return $user->role === 'admin'
            || $skill->user_id === $user->id;
    }

    public function delete(User $user, Skill $skill): bool
    {
        return $user->role === 'admin'
            || $skill->user_id === $user->id;
    }
}
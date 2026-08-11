<?php

namespace App\Policies;

use App\Models\ProjectFeature;
use App\Models\User;

class ProjectFeaturePolicy
{
    public function viewAny(User $user, ProjectFeature $feature): bool
    {
        return $user->role === 'admin'
            || $feature->project->user_id === $user->id;
    }

    public function view(User $user, ProjectFeature $feature): bool
    {
        return $user->role === 'admin'
            || $feature->project->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, ProjectFeature $feature): bool
    {
        return $user->role === 'admin'
            || $feature->project->user_id === $user->id;
    }

    public function delete(User $user, ProjectFeature $feature): bool
    {
        return $user->role === 'admin'
            || $feature->project->user_id === $user->id;
    }
}
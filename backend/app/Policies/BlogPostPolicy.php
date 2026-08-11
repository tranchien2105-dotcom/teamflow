<?php

namespace App\Policies;

use App\Models\BlogPost;
use App\Models\User;

class BlogPostPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, BlogPost $blogPost): bool
    {
        return $user->role === 'admin'
            || $blogPost->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, BlogPost $blogPost): bool
    {
        return $user->role === 'admin'
            || $blogPost->user_id === $user->id;
    }

    public function delete(User $user, BlogPost $blogPost): bool
    {
        return $user->role === 'admin'
            || $blogPost->user_id === $user->id;
    }
}
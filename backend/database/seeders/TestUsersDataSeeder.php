<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestUsersDataSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | User 2
        |--------------------------------------------------------------------------
        */

        $user2 = User::findOrFail(2);

        Profile::updateOrCreate(
            ['user_id' => $user2->id],
            [
                'full_name' => 'Test User',
                'title' => 'Full Stack Developer',
                'bio' => 'Full Stack Developer working with Laravel, Next.js and PostgreSQL.',
                'phone' => '0909876543',
                'address' => 'District 7, Ho Chi Minh City',
                'github_url' => 'https://github.com/testuser2',
                'linkedin_url' => null,
                'website_url' => null,
                'cv_template' => 'classic',
            ]
        );

        Experience::create([
            'user_id' => $user2->id,
            'company' => 'Tech Solutions',
            'position' => 'Full Stack Developer',
            'location' => 'Ho Chi Minh City',
            'employment_type' => 'Full-time',
            'start_date' => '2024-03-01',
            'end_date' => null,
            'description' => 'Developed web applications using Laravel, Next.js and PostgreSQL.',
        ]);

        Experience::create([
            'user_id' => $user2->id,
            'company' => 'Web Studio',
            'position' => 'Junior PHP Developer',
            'location' => 'Ho Chi Minh City',
            'employment_type' => 'Full-time',
            'start_date' => '2022-06-01',
            'end_date' => '2024-02-01',
            'description' => 'Developed backend features and RESTful APIs using PHP and Laravel.',
        ]);

        Skill::create([
            'user_id' => $user2->id,
            'name' => 'PHP',
            'category' => 'Backend',
            'level' => 'Advanced',
            'years_of_experience' => 3,
        ]);

        Skill::create([
            'user_id' => $user2->id,
            'name' => 'Laravel',
            'category' => 'Backend',
            'level' => 'Advanced',
            'years_of_experience' => 3,
        ]);

        Skill::create([
            'user_id' => $user2->id,
            'name' => 'Next.js',
            'category' => 'Frontend',
            'level' => 'Intermediate',
            'years_of_experience' => 1,
        ]);

        Skill::create([
            'user_id' => $user2->id,
            'name' => 'PostgreSQL',
            'category' => 'Database',
            'level' => 'Intermediate',
            'years_of_experience' => 2,
        ]);

        Skill::create([
            'user_id' => $user2->id,
            'name' => 'Docker',
            'category' => 'DevOps',
            'level' => 'Intermediate',
            'years_of_experience' => 2,
        ]);

        Project::create([
            'user_id' => $user2->id,
            'title' => 'Team Collaboration Platform',
            'slug' => 'team-collaboration-platform',
            'summary' => 'A platform for managing teams, projects and tasks.',
            'content' => 'Built a collaboration platform with Laravel API and Next.js frontend.',
            'featured' => true,
            'status' => 'completed',
            'started_at' => '2025-01-01',
            'completed_at' => '2025-05-01',
        ]);

        Project::create([
            'user_id' => $user2->id,
            'title' => 'Online Booking System',
            'slug' => 'online-booking-system',
            'summary' => 'An online booking platform for service businesses.',
            'content' => 'Developed booking APIs, authentication, customer management and scheduling features.',
            'featured' => false,
            'status' => 'active',
            'started_at' => '2026-02-01',
            'completed_at' => null,
        ]);

        BlogPost::create([
            'user_id' => $user2->id,
            'title' => 'Laravel API Authentication',
            'slug' => 'laravel-api-authentication',
            'excerpt' => 'Understanding authentication and authorization in Laravel APIs.',
            'content' => 'This article explains how authentication and authorization work in Laravel API applications.',
            'cover_image' => null,
            'published_at' => now(),
        ]);

        BlogPost::create([
            'user_id' => $user2->id,
            'title' => 'Building Applications with Next.js',
            'slug' => 'building-applications-with-nextjs',
            'excerpt' => 'Exploring Server Components and Client Components in Next.js.',
            'content' => 'Next.js provides a modern architecture for building full-stack web applications.',
            'cover_image' => null,
            'published_at' => now(),
        ]);
    }
}

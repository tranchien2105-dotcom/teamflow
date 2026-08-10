<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            return;
        }

        $skills = [
            // Backend
            [
                'name' => 'PHP',
                'category' => 'Backend',
                'level' => 'Advanced',
                'years_of_experience' => 4,
            ],
            [
                'name' => 'Laravel',
                'category' => 'Backend',
                'level' => 'Advanced',
                'years_of_experience' => 4,
            ],
            [
                'name' => 'Apiato',
                'category' => 'Backend',
                'level' => 'Advanced',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Yii',
                'category' => 'Backend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'RESTful API',
                'category' => 'Backend',
                'level' => 'Advanced',
                'years_of_experience' => 4,
            ],
            [
                'name' => 'MVC Architecture',
                'category' => 'Backend',
                'level' => 'Advanced',
                'years_of_experience' => 4,
            ],
            [
                'name' => 'JWT',
                'category' => 'Backend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Laravel Passport',
                'category' => 'Backend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Queue',
                'category' => 'Backend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Job',
                'category' => 'Backend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Laravel Event',
                'category' => 'Backend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],

            // Frontend
            [
                'name' => 'Vue.js',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'JavaScript',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'years_of_experience' => 3,
            ],
            [
                'name' => 'HTML',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'years_of_experience' => 3,
            ],
            [
                'name' => 'CSS',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'years_of_experience' => 3,
            ],
            [
                'name' => 'jQuery',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Ajax',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],

            // Database
            [
                'name' => 'MySQL',
                'category' => 'Database',
                'level' => 'Advanced',
                'years_of_experience' => 4,
            ],
            [
                'name' => 'PostgreSQL',
                'category' => 'Database',
                'level' => 'Advanced',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Database Optimization',
                'category' => 'Database',
                'level' => 'Advanced',
                'years_of_experience' => 3,
            ],
            [
                'name' => 'Redis',
                'category' => 'Database',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Cache',
                'category' => 'Database',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],

            // DevOps
            [
                'name' => 'Docker',
                'category' => 'DevOps',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Nginx',
                'category' => 'DevOps',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'Linux',
                'category' => 'DevOps',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],

            // Testing / API
            [
                'name' => 'Postman',
                'category' => 'Testing',
                'level' => 'Advanced',
                'years_of_experience' => 3,
            ],

            // Tools
            [
                'name' => 'Git',
                'category' => 'Tools',
                'level' => 'Advanced',
                'years_of_experience' => 4,
            ],
            [
                'name' => 'Navicat',
                'category' => 'Tools',
                'level' => 'Advanced',
                'years_of_experience' => 3,
            ],
            [
                'name' => 'GitKraken',
                'category' => 'Tools',
                'level' => 'Intermediate',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'XAMPP',
                'category' => 'Tools',
                'level' => 'Intermediate',
                'years_of_experience' => 3,
            ],
            [
                'name' => 'ChatGPT',
                'category' => 'Tools',
                'level' => 'Advanced',
                'years_of_experience' => 2,
            ],
            [
                'name' => 'GitHub Copilot',
                'category' => 'Tools',
                'level' => 'Intermediate',
                'years_of_experience' => 1,
            ],
            [
                'name' => 'Gemini',
                'category' => 'Tools',
                'level' => 'Intermediate',
                'years_of_experience' => 1,
            ],
            [
                'name' => 'DeepSeek',
                'category' => 'Tools',
                'level' => 'Intermediate',
                'years_of_experience' => 1,
            ],
        ];

        foreach ($skills as $skill) {
            $user->skills()->updateOrCreate(
                [
                    'name' => $skill['name'],
                ],
                [
                    'category' => $skill['category'],
                    'level' => $skill['level'],
                    'years_of_experience' => $skill['years_of_experience'],
                ]
            );
        }
    }
}
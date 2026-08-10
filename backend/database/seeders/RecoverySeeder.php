<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Experience;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class RecoverySeeder extends Seeder
{
    public function run(): void
    {
        $path = base_path('database/data/teamflow-recovery-data.json');

        if (!File::exists($path)) {
            $this->command->error(
                "Recovery data file not found: {$path}"
            );

            return;
        }

        $data = json_decode(
            File::get($path),
            true
        );

        if (!is_array($data)) {
            $this->command->error(
                'Invalid recovery JSON file.'
            );

            return;
        }

        /*
        |--------------------------------------------------------------------------
        | User
        |--------------------------------------------------------------------------
        */

        $userData = $data['user'] ?? null;

        if (!$userData) {
            $this->command->error(
                'User data not found in recovery JSON.'
            );

            return;
        }

        $user = User::updateOrCreate(
            [
                'email' => $userData['email'],
            ],
            [
                'name' => $userData['name'],
                'phone' => $userData['phone'] ?? null,
                'location' => $userData['location'] ?? null,
                'github' => $userData['github'] ?? null,
                'password' => Hash::make('21052000'),
            ]
        );

        $this->command->info(
            "User restored: {$user->email}"
        );

        /*
        |--------------------------------------------------------------------------
        | Schools
        |--------------------------------------------------------------------------
        */

        $schools = [];

        foreach ($data['schools'] ?? [] as $schoolData) {
            $school = School::updateOrCreate(
                [
                    'name' => $schoolData['name'],
                ],
                [
                    'short_name' => $schoolData['short_name'] ?? null,
                    'location' => $schoolData['location'] ?? null,
                ]
            );

            $schools[$school->name] = $school;

            $this->command->info(
                "School restored: {$school->name}"
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Education
        |--------------------------------------------------------------------------
        */

        foreach ($data['education'] ?? [] as $educationData) {
            $schoolName = $educationData['school'] ?? null;

            $school = $schools[$schoolName]
                ?? School::where('name', $schoolName)->first();

            if (!$school) {
                $this->command->warn(
                    "School not found: {$schoolName}"
                );

                continue;
            }

            Education::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'school_id' => $school->id,
                    'degree' => $educationData['degree'],
                    'field_of_study' => $educationData['field_of_study'],
                ],
                [
                    'start_date' => $educationData['start_date'],
                    'end_date' => $educationData['end_date'] ?? null,
                    'description' => $educationData['description'] ?? null,
                ]
            );

            $this->command->info(
                "Education restored: {$schoolName}"
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Experience
        |--------------------------------------------------------------------------
        */

        foreach ($data['experiences'] ?? [] as $experienceData) {
            Experience::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'company' => $experienceData['company'],
                    'position' => $experienceData['position'],
                ],
                [
                    'location' =>
                        $experienceData['location'] ?? null,

                    'employment_type' =>
                        $experienceData['employment_type'] ?? null,

                    'start_date' =>
                        $experienceData['start_date'],

                    'end_date' =>
                        $experienceData['end_date'] ?? null,

                    'description' =>
                        $experienceData['description'] ?? null,
                ]
            );

            $this->command->info(
                "Experience restored: {$experienceData['company']}"
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Skills
        |--------------------------------------------------------------------------
        */

        foreach ($data['skills'] ?? [] as $skillData) {
            $user->skills()->updateOrCreate(
                [
                    'name' => $skillData['name'],
                ],
                [
                    'category' =>
                        $skillData['category'] ?? 'Other',

                    'level' =>
                        $skillData['level'] ?? 'Intermediate',

                    'years_of_experience' =>
                        $skillData['years_of_experience'] ?? 0,
                ]
            );

            $this->command->info(
                "Skill restored: {$skillData['name']}"
            );
        }

        $this->command->info('');

        $this->command->info(
            'Recovery completed successfully.'
        );
    }
}

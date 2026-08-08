<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $schools = [
            [
                'name' => 'University of Information Technology - VNU-HCM',
                'short_name' => 'UIT',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Ho Chi Minh City University of Technology - VNU-HCM',
                'short_name' => 'HCMUT',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'University of Science - VNU-HCM',
                'short_name' => 'HCMUS',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'University of Economics Ho Chi Minh City',
                'short_name' => 'UEH',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'University of Economics and Law - VNU-HCM',
                'short_name' => 'UEL',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Ho Chi Minh City University of Technology and Education',
                'short_name' => 'HCMUTE',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Ton Duc Thang University',
                'short_name' => 'TDTU',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'RMIT University Vietnam',
                'short_name' => 'RMIT',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'FPT University',
                'short_name' => 'FPT',
                'location' => 'Vietnam',
            ],
            [
                'name' => 'Posts and Telecommunications Institute of Technology',
                'short_name' => 'PTIT',
                'location' => 'Hanoi',
            ],
            [
                'name' => 'Hanoi University of Science and Technology',
                'short_name' => 'HUST',
                'location' => 'Hanoi',
            ],
            [
                'name' => 'Vietnam National University - University of Engineering and Technology',
                'short_name' => 'UET',
                'location' => 'Hanoi',
            ],
            [
                'name' => 'Industrial University of Ho Chi Minh City',
                'short_name' => 'IUH',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Ho Chi Minh City University of Industry and Trade',
                'short_name' => 'HUIT',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Van Lang University',
                'short_name' => 'VLU',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Hoa Sen University',
                'short_name' => 'HSU',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'Saigon University',
                'short_name' => 'SGU',
                'location' => 'Ho Chi Minh City',
            ],
            [
                'name' => 'University of Transport and Communications',
                'short_name' => 'UTC',
                'location' => 'Hanoi',
            ],
            [
                'name' => 'Duy Tan University',
                'short_name' => 'DTU',
                'location' => 'Da Nang',
            ],
            [
                'name' => 'University of Information and Communication Technology',
                'short_name' => 'ICTU',
                'location' => 'Thai Nguyen',
            ],
        ];

        foreach ($schools as $school) {
            School::updateOrCreate(
                ['name' => $school['name']],
                $school
            );
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\JsonResponse;

class SchoolController extends Controller
{
    public function index(): JsonResponse
    {
        $schools = School::query()
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'short_name',
                'location',
            ]);

        return response()->json($schools);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function ping()
    {
        return response()->json([
            'success' => true,
            'message' => 'Laravel API is running',
        ]);
    }
}
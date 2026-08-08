<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;

Route::get('/ping', [TestController::class, 'ping']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/profile', [ProfileController::class, 'store']);
    Route::put('/profile', [ProfileController::class, 'update']);

    Route::apiResource('experiences', ExperienceController::class);
    Route::apiResource('educations', EducationController::class);
    Route::apiResource('skills',SkillController::class);

    Route::get('/schools', [SchoolController::class, 'index']);
});

<?php

use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CvController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectFeatureController;
use App\Http\Controllers\ProjectImageController;
use App\Http\Controllers\ProjectLinkController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/ping', [TestController::class, 'ping']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'admin'])->get(
    '/admin/test',
    function () {
        return response()->json([
            'message' => 'Admin access granted.',
        ]);
    }
);

// Protected
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Profile
    Route::post('/profile', [ProfileController::class, 'store']);
    Route::put('/profile', [ProfileController::class, 'update']);

    // Experiences
    Route::apiResource('experiences', ExperienceController::class);

    // Educations
    Route::apiResource('educations', EducationController::class);

    // Skills
    Route::apiResource('skills', SkillController::class);

    // Projects
    Route::apiResource('projects', ProjectController::class);

    // Blogs 
    Route::apiResource('blog-posts', BlogPostController::class);

    // Certificate
    Route::apiResource('certificates', CertificateController::class);

    // Project Features
    Route::get('projects/{project}/features', [ProjectFeatureController::class, 'index']);
    Route::post('projects/{project}/features', [ProjectFeatureController::class, 'store']);
    Route::put('projects/{project}/features/{feature}', [ProjectFeatureController::class, 'update']);
    Route::delete('projects/{project}/features/{feature}', [ProjectFeatureController::class, 'destroy']);

    // Project Images
    Route::get('projects/{project}/images', [ProjectImageController::class, 'index']);
    Route::post('projects/{project}/images', [ProjectImageController::class, 'store']);
    Route::put('projects/{project}/images/{image}', [ProjectImageController::class, 'update']);
    Route::delete('projects/{project}/images/{image}', [ProjectImageController::class, 'destroy']);

    // Project Technologies
    Route::put('projects/{project}/technologies', [ProjectController::class, 'syncTechnologies']);

    // Project Links
    Route::get('projects/{project}/links', [ProjectLinkController::class, 'index']);
    Route::post('projects/{project}/links', [ProjectLinkController::class, 'store']);
    Route::put('projects/{project}/links/{link}', [ProjectLinkController::class, 'update']);
    Route::delete('projects/{project}/links/{link}', [ProjectLinkController::class, 'destroy']);

    // Technologies
    Route::get('/technologies', [TechnologyController::class, 'index']);

    Route::middleware('admin')->group(function () {
        Route::apiResource('technologies', TechnologyController::class)
            ->except(['index']);
    });

    // Schools
    Route::get('/schools', [SchoolController::class, 'index']);

    // Create CV
    Route::get('/cv', [CvController::class, 'show']);
    Route::put('/cv/template', [CvController::class, 'updateTemplate']);

    // Admin User
    Route::middleware('admin')
        ->prefix('admin')
        ->group(function () {
            Route::get('/users', [AdminUserController::class, 'index']);
            Route::get('/users/{user}', [AdminUserController::class, 'show']);

            Route::patch(
                '/users/{user}/role',
                [AdminUserController::class, 'changeRole']
            );
        });

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('content')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('github_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->boolean('featured')->default(false);
            $table->string('status')->default('draft');
            $table->date('started_at')->nullable();
            $table->date('completed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

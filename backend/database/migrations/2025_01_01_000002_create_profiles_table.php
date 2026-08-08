
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->unique();

            $table->string('full_name')->nullable();
            $table->string('title')->nullable();
            $table->text('bio')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('cv_url')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('website_url')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};

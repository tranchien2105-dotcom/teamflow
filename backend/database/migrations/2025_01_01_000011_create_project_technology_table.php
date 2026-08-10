<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_technology', function (Blueprint $table) {
            $table->uuid('project_id');
            $table->uuid('technology_id');

            $table->primary([
                'project_id',
                'technology_id',
            ]);

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->cascadeOnDelete();

            $table->foreign('technology_id')
                ->references('id')
                ->on('technologies')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_technology');
    }
};
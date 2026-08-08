<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('short_name')->nullable();
            $table->string('location')->nullable();
            $table->timestamps();

            $table->unique('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
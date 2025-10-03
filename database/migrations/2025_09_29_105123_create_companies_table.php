<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('owner');
            $table->string('supervisor');
            $table->string('image')->nullable();
            $table->string('contact')->nullable();
            $table->string('address')->nullable();
            $table->string('nature');
            $table->longText('description')->nullable();
            $table->integer('slot')->default(0);
            $table->string('email')->unique();
            $table->longText('password');
            $table->string('moa')->nullable();
            $table->string('moa_start_date')->nullable();
            $table->string('moa_start_end')->nullable();
            $table->time('am_time_in')->default('08:00:00');
            $table->time('am_time_out')->default('12:00:00');
            $table->time('pm_time_in')->default('13:00:00'); 
            $table->time('pm_time_out')->default('17:00:00');
            $table->tinyInteger('is_archive')->default(0);
            $table->tinyInteger('is_verified')->default(0);
            $table->string('otp');
            $table->longText('device_token');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
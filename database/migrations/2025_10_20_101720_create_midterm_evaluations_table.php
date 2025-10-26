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
        Schema::create('midterm_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->integer('knowledge_of_work');
            $table->integer('quality_and_quantity_of_work');
            $table->integer('punctuality_attendance');
            $table->integer('communication_skill');
            $table->integer('rapport_with_employee');
            $table->integer('physical_appearance_grooming');
            $table->integer('ability_to_follow_direction');
            $table->integer('courtesy');
            $table->integer('initiative');
            $table->integer('drive_and_leadership');
            $table->integer('interest_motivation');
            $table->integer('reliability');
            $table->integer('mental_maturity');
            $table->integer('emotional_maturity');
            $table->integer('interpersonal_maturity');
            $table->longText('student_strong_points');
            $table->longText('student_need_improvements');
            $table->tinyInteger('is_discussed')->default(0);
            $table->tinyInteger('is_signed')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('midterm_evaluations');
    }
};

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
        Schema::create('final_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->integer('knowledge_of_the_work_assigned');
            $table->integer('efficiency');
            $table->integer('quality_of_work');
            $table->integer('cleanliness_and_orderliness_of_work');
            $table->integer('handling_of_office_equipments');
            $table->integer('personality');
            $table->integer('attendance');
            $table->integer('punctuality');
            $table->integer('honesty');
            $table->integer('initiative');
            $table->integer('courtesy_and_respect');
            $table->integer('rapport_with_co_workers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('final_evaluations');
    }
};

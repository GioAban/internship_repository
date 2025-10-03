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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete()->nullable();
            $table->foreignId('school_year_id')->constrained()->cascadeOnDelete(); 
            $table->string('subject_code');  
            $table->string('student_number');  
            $table->string('firstname');      
            $table->string('lastname');       
            $table->string('middle_initial')->nullable();  
            $table->string('image')->nullable(); 
            $table->string('gender');   
            $table->string('birthday')->nullable();       
            $table->string('contact')->nullable();        
            $table->string('year')->nullable();        
            $table->string('status');          
            $table->string('deployed_date')->nullable();  
            $table->string('completed_date')->nullable();  
            $table->string('department_assigned')->nullable();  
            $table->string('address')->nullable();
            $table->string('parent')->nullable(); 
            $table->string('guardian')->nullable();  
            $table->string('email');  
            $table->longText('password');     
            $table->string('temporary_password');   
            $table->tinyInteger('is_approve')->default(0); 
            $table->tinyInteger('is_archive')->default(0); 
            $table->tinyInteger('is_verified')->default(0);  
            $table->string('device_token')->nullable(); 
            $table->string('otp')->nullable(); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
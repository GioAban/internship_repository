<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // <-- gamitin ito
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'program_id',
        'company_id',
        'school_year_id',
        'subject_code',
        'student_number',
        'firstname',
        'lastname',
        'middle_initial',
        'image',
        'gender',
        'birthday',
        'contact',
        'year',
        'status',
        'deployed_date',
        'completed_date',
        'department_assigned',
        'address',
        'parent',
        'guardian',
        'email',
        'password',
        'temporary_password',
        'is_archived',
        'is_verified',
        'device_token',
        'otp',
    ];
    public function program() {
          return $this->belongsTo(Program::class);
    }
    public function company() {
          return $this->belongsTo(Company::class);
    }
    public function schoolYear() {
          return $this->belongsTo(SchoolYear::class);
    }

    // Para sa password hashing
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
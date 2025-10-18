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
        'is_approve',
        'is_archive',
        'is_verified',
        'device_token',
        'otp',
    ];

    // Para sa password hashing
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
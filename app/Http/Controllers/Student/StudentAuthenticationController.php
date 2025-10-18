<?php

namespace App\Http\Controllers\Student;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentAuthenticationController extends Controller
{
    public function login()
    {
        return Inertia::render('Student/Login');
    }
    public function dashboard()
    {
        return Inertia::render('Student/Dashboard', [
            'user' => Auth::guard('student')->user(),
            'guard' => 'student'
        ]);

    }
}
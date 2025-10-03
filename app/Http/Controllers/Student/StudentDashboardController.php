<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function studentRequirement()
    {
        return Inertia::render('Student/Requirement');
    }
    public function studentDailyTimeRecord()
    {
        return Inertia::render('Student/DailyTimeRecord');
    }
    public function announcement()
    {
        return Inertia::render('Student/Announcement');
    }
    public function WeeklyReport()
    {
        return Inertia::render('Student/WeeklyReport');
    }
    public function profile()
    {
        return Inertia::render('Student/Profile');
    }
}
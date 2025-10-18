<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function announcement()
    {
        return Inertia::render('Student/Announcement');
    }
    public function studentDocumentRequirement()
    {
        return Inertia::render('Student/DocumentRequirement');
    }
    public function studentDailyTimeRecord()
    {
        return Inertia::render('Student/DailyTimeRecord');
    }
    public function WeeklyReport()
    {
        return Inertia::render('Student/WeeklyReport');
    }
    public function viewCompany()
    {
        return Inertia::render('Student/Company');
    }
    public function profile()
    {
        return Inertia::render('Student/Profile');
    }
}
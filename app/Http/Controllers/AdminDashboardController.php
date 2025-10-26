<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\College;
use App\Models\Program;
use App\Models\User;
use App\Models\SchoolYear;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }
    public function analytic()
    {
        return Inertia::render('Admin/Analytic');
    }
    public function colleges()
    {
        $initialColleges = College::with('programs')->where('id', '!=', 1)->orderByDesc('id')->get();
        return Inertia::render('Admin/College', compact('initialColleges'));
    }
    public function programs()
    {
        $initialPrograms = Program::orderByDesc('id')->get();
        return Inertia::render('Admin/Program', compact('initialPrograms'));
    }
    public function users()
    {
        $initialUsers = User::with('program')->where('role_as', '!=', 1)->orderByDesc('id')->get();
        return Inertia::render('Admin/User', compact('initialUsers'));
    }
    public function schoolYear()
    {
        $initialSchoolYears = SchoolYear::where('is_archived', '!=', 1)->orderByDesc('id')->get();
        return Inertia::render('Admin/SchoolYear', compact('initialSchoolYears'));
    }
    public function reports()
    {
        return Inertia::render('Admin/Report');
    }
   public function archives() {
        $initialColleges = College::where('is_archived', 1)->where('id', '!=', 1)->orderByDesc('id')->get();
        $initialPrograms = Program::where('is_archived', 1)->orderByDesc('id')->get();
        $initialUsers = User::with('program')->where('is_archived', 1)->with('program')->where('role_as', '!=', 1)->orderByDesc('id')->get();
        $initialSchoolYears = SchoolYear::where('is_archived', 1)->orderByDesc('id')->get();
        return Inertia::render('Admin/Archive', [
            'initialColleges' => $initialColleges,
            'initialPrograms' => $initialPrograms,
            'initialUsers' => $initialUsers,
            'initialSchoolYears' => $initialSchoolYears,
        ]);
    }

}
<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Company;
use App\Models\InitialRequirement;
use App\Models\PostRequirement;
use App\Models\PreRequirement;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\SchoolYear;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
class CoordinatorDashboardController extends Controller
{
    public function index()
    {
        $defaultSchoolYear = SchoolYear::where('is_default', 1)->first();
        if ($defaultSchoolYear) {
            session([
                'school_year_id' => $defaultSchoolYear->id,
                'school_year' => $defaultSchoolYear->school_year,
            ]);
        }
        return Inertia::render('Coordinator/Dashboard', [
            'school_year' => session('school_year'),
            'school_year_id' => session('school_year_id'),
        ]);
    }
    public function listStudents()
    {
        $initialStudents = Student::with(['program', 'company', 'schoolYear'])
            ->where('program_id', Auth::user()->program_id) 
            ->where('is_archived', 0)
            ->orderByDesc('id')
            ->get();
        return Inertia::render('Coordinator/ListStudent', compact('initialStudents'));
    }
    public function hostTrainingEstablishments()
    {
        $initialCompanies = Company::where('program_id', Auth::user()->program_id) 
            ->where('is_archived', 0)
            ->orderByDesc('id')
            ->get();
        return Inertia::render('Coordinator/HostTrainingEstablishment', compact('initialCompanies'));
    }
    public function evaluations()
    {
        return Inertia::render('Coordinator/Evaluation');
    }
    public function tracking()
    {
        return Inertia::render('Coordinator/Tracking');
    }
    public function announcements()
    {
        $initialAnnouncements = Announcement::where('program_id', Auth::user()->program_id)
            ->where('school_year_id', Session::get('school_year_id'))
            ->orderByDesc('id')
            ->get();
        return Inertia::render('Coordinator/Announcement', compact('initialAnnouncements'));
    }
    public function documentRequirements()
    {
        $initialRequirements = InitialRequirement::where('school_year_id', Session::get('school_year_id'))->
            where('program_id', Auth::user()->program_id)
            ->orderByDesc('id')
            ->get();
        $preRequirements = PreRequirement::where('school_year_id', Session::get('school_year_id'))->
            where('program_id', Auth::user()->program_id)
            ->orderByDesc('id')
            ->get();
        $postRequirements = PostRequirement::where('school_year_id', Session::get('school_year_id'))->
            where('program_id', Auth::user()->program_id)
            ->orderByDesc('id')
            ->get();
        return Inertia::render('Coordinator/DocumentRequirement', compact('initialRequirements', 'preRequirements', 'postRequirements'));
    }
    public function reports()
    {
        return Inertia::render('Coordinator/Report');
    }
    public function archives()
    {
        return Inertia::render('Coordinator/Archive');
    }
    public function schoolYears()
    {
        return Inertia::render('Coordinator/SchoolYear');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Company;
use App\Models\FinalEvaluation;
use App\Models\InitialRequirement;
use App\Models\MidtermEvaluation;
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
        $initialMidtermEvaluations = MidtermEvaluation::join('students', 'students.id', '=', 'midterm_evaluations.student_id')
        ->join('companies', 'companies.id', '=', 'students.company_id')
        ->where('students.school_year_id', Session::get('school_year_id'))
        ->where('students.program_id', Auth::user()->program_id)
        ->select(
            'midterm_evaluations.*',
            'students.student_number',
            'students.firstname',
            'students.lastname',
            'students.gender',
            'students.subject_code',
            'companies.name as company'
        )
        ->orderByDesc('midterm_evaluations.id')
        ->get();
    $initialFinalEvaluations = FinalEvaluation::join('students', 'students.id', '=', 'final_evaluations.student_id')
        ->join('companies', 'companies.id', '=', 'students.company_id')
        ->where('students.school_year_id', Session::get('school_year_id'))
        ->where('students.program_id', Auth::user()->program_id)
        ->select(
            'final_evaluations.*',
            'students.student_number',
            'students.firstname',
            'students.lastname',
            'students.gender',
            'students.subject_code',
            'companies.name as company'
        )
        ->orderByDesc('final_evaluations.id')
        ->get();
        return Inertia::render('Coordinator/Evaluation', compact('initialMidtermEvaluations', 'initialFinalEvaluations'));
    }
    public function reports()
    {
        return Inertia::render('Coordinator/Report');
    }
    public function archives()
    {
        $initialCompanies = Company::where('is_archived', 1)->orderByDesc('id')->get();
        $initialStudents = Student::where('is_archived', 1)->orderByDesc('id')->get();
        $initialRequirements = InitialRequirement::where('is_archived', 1)->orderByDesc('id')->get();
        $initialPreRequirements = PreRequirement::where('is_archived', 1)->orderByDesc('id')->get();
        $initialPostRequirements = PostRequirement::where('is_archived', 1)->orderByDesc('id')->get();
        return Inertia::render('Coordinator/Archive', compact('initialCompanies', 'initialStudents', 'initialRequirements', 'initialPreRequirements', 'initialPostRequirements'));
    }
    public function schoolYears()
    {
        return Inertia::render('Coordinator/SchoolYear');
    }
}
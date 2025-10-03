<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CoordinatorDashboardController;
use App\Http\Controllers\Student\StudentAuthenticationController;
use App\Http\Controllers\Company\CompanyAuthenticationController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    if (Auth::check()) {
        $role = (int) Auth::user()->role_as;
        if ($role === 1) {
            return redirect()->route('admin.dashboard');
        } elseif ($role === 2) {
            return redirect()->route('coordinator.dashboard');
        }
    }
    return Inertia::render('Welcome');
});
Route::get('/become-a-partner', function () {
       return Inertia::render('BecomePartner');
});
Route::get('/student-login', [StudentAuthenticationController::class, 'login'])->name('student-login');
Route::get('/company-login', [CompanyAuthenticationController::class, 'login'])->name('company-login');

// Student needs routes middle ware (role:student)
Route::get('/student-dashboard', [StudentAuthenticationController::class, 'dashboard'])->name('student-dashboard');
Route::get('/student-requirements', [StudentDashboardController::class, 'studentRequirement'])->name('student-requirements');
Route::get('/student-daily-time-records', [StudentDashboardController::class, 'studentDailyTimeRecord'])->name('student-daily-time-records');
Route::get('/student-announcements', [StudentDashboardController::class, 'announcement'])->name('student-announcements');
Route::get('/student-profiles', [StudentDashboardController::class, 'profiles'])->name('student-profiles');
Route::get('/student-weekly-reports', [StudentDashboardController::class, 'weeklyReport'])->name('student-weekly-reports');

// Admin routes (role:admin)
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/colleges', [AdminDashboardController::class, 'colleges'])->name('colleges');
        Route::get('/programs', [AdminDashboardController::class, 'programs'])->name('programs');
        Route::get('/users', [AdminDashboardController::class, 'users'])->name('users');
        Route::get('/reports', [AdminDashboardController::class, 'reports'])->name('reports');
        Route::get('/archives', [AdminDashboardController::class, 'archives'])->name('archives');
        Route::get('/school_years', [AdminDashboardController::class, 'schoolYears'])->name('school_years');
    });

// Coordinator routes (role:coordinator)
Route::middleware(['auth', 'role:coordinator'])
    ->prefix('coordinator')
    ->name('coordinator.')
    ->group(function () {
        Route::get('/dashboard', [CoordinatorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/listStudents', [CoordinatorDashboardController::class, 'listStudents'])->name('listStudents');
        Route::get('/hostTrainingEstablishments', [CoordinatorDashboardController::class, 'hostTrainingEstablishments'])->name('hostTrainingEstablishments');
        Route::get('/evaluations', [CoordinatorDashboardController::class, 'evaluations'])->name('evaluations');
        Route::get('/announcements', [CoordinatorDashboardController::class, 'announcements'])->name('announcements');
        Route::get('/documentRequirements', [CoordinatorDashboardController::class, 'documentRequirements'])->name('documentRequirements');
        Route::get('/reports', [CoordinatorDashboardController::class, 'reports'])->name('reports');
        Route::get('/archives', [CoordinatorDashboardController::class, 'archives'])->name('archives');
        Route::get('/schoolYears', [CoordinatorDashboardController::class, 'schoolYears'])->name('schoolYears');
    });

// Shared profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
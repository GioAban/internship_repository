<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CoordinatorDashboardController;
use App\Http\Controllers\Student\StudentAuthenticationController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware('redirect.if.auth')->group(function () {
    Route::get('/', fn () => Inertia::render('Welcome'));
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    
});


Route::post('student.company.logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('student.company.logout');
Route::get('/become-a-partner', function () {
       return Inertia::render('BecomePartner');
});


// Student needs routes middle ware (role:student)
Route::get('/student-dashboard', [StudentAuthenticationController::class, 'dashboard'])->name('student-dashboard');
Route::get('/student-documents-requirements', [StudentDashboardController::class, 'studentDocumentRequirement'])->name('student-documents-requirements');
Route::get('/student-daily-time-records', [StudentDashboardController::class, 'studentDailyTimeRecord'])->name('student-daily-time-records');
Route::get('/student-announcements', [StudentDashboardController::class, 'announcement'])->name('student-announcements');
Route::get('/student-profile', [StudentDashboardController::class, 'profile'])->name('student-profile');
Route::get('/student-weekly-reports', [StudentDashboardController::class, 'weeklyReport'])->name('student-weekly-reports');
Route::get('/student-company', [StudentDashboardController::class, 'viewCompany'])->name('student-company');



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

// Student routes (role:student)
Route::middleware(['auth:student'])
    ->prefix('student')
    ->as('student.')
    ->group(function () {
        Route::get('/dashboard', [StudentAuthenticationController::class, 'dashboard'])->name('dashboard');
        Route::get('/requirements', [StudentDashboardController::class, 'studentDocumentRequirement'])->name('requirements');
        Route::get('/dtr', [StudentDashboardController::class, 'studentDailyTimeRecord'])->name('dtr');
        Route::get('/announcements', [StudentDashboardController::class, 'announcement'])->name('announcements');
        Route::get('/profiles', [StudentDashboardController::class, 'profiles'])->name('profiles');
        Route::get('/weekly-reports', [StudentDashboardController::class, 'weeklyReport'])->name('weekly-reports');
    });


// Shared profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
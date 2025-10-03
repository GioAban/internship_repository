<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CoordinatorDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Coordinator/Dashboard');
    }
    public function listStudents()
    {
        return Inertia::render('Coordinator/ListStudent');
    }
    public function hostTrainingEstablishments()
    {
        return Inertia::render('Coordinator/HostTrainingEstablishment');
    }
    public function evaluations()
    {
        return Inertia::render('Coordinator/Evaluation');
    }
    public function announcements()
    {
        return Inertia::render('Coordinator/Announcement');
    }
    public function documentRequirements()
    {
        return Inertia::render('Coordinator/DocumentRequirement');
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
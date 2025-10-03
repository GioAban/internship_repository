<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }
    public function colleges()
    {
        return Inertia::render('Admin/College');
    }
    public function programs()
    {
        return Inertia::render('Admin/Program');
    }
    public function users()
    {
        return Inertia::render('Admin/User');
    }
    public function schoolYears()
    {
        return Inertia::render('Admin/SchoolYear');
    }
    public function reports()
    {
        return Inertia::render('Admin/Report');
    }
    public function archives()
    {
        return Inertia::render('Admin/Archive');
    }
}

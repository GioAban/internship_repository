<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyAuthenticationController extends Controller
{
    public function login()
    {
        return Inertia::render('Company/Login');
    }
}
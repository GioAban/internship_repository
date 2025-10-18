<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'login' => ['required', 'string'], // can be email or student_number
            'password' => ['required', 'string'],
        ]);

        // Determine if login is email or student number
        $loginInput = $request->input('login');
        $isEmail = filter_var($loginInput, FILTER_VALIDATE_EMAIL);

        // 1. Try Users (using email)
        if ($isEmail && Auth::guard('web')->attempt([
            'email' => $loginInput,
            'password' => $request->password,
        ], $request->boolean('remember'))) {
            $request->session()->regenerate();

            $role = (int) Auth::user()->role_as;

            if ($role === 1) {
                return redirect()->intended(route('admin.dashboard'));
            } elseif ($role === 2) {
                return redirect()->intended(route('coordinator.dashboard'));
            }

            return redirect()->intended(route('dashboard'));
        }

        // 2. Try Students (using student_number)
        if (!$isEmail && Auth::guard('student')->attempt([
            'student_number' => $loginInput,
            'password' => $request->password,
        ], $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended(route('student.dashboard'));
        }

        // 3. Try Companies (using email)
        if ($isEmail && Auth::guard('company')->attempt([
            'email' => $loginInput,
            'password' => $request->password,
        ], $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended(route('company.dashboard'));
        }

        return back()->withErrors([
            'login' => 'The provided credentials do not match our records.',
        ]);
    }



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $guard = Auth::getDefaultDriver();

        Auth::guard($guard)->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

}
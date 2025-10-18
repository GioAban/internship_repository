<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticatedCustom
{
    public function handle(Request $request, Closure $next, ...$guards)
    {
        // Check default web user (admin/coordinator)
        if (Auth::guard('web')->check()) {
            $role = (int) Auth::user()->role_as;
            if ($role === 1) {
                return redirect()->route('admin.dashboard');
            } elseif ($role === 2) {
                return redirect()->route('coordinator.dashboard');
            }
        }

        // Check student guard
        if (Auth::guard('student')->check()) {
            return redirect()->route('student.dashboard');
        }

        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }
        $user = Auth::user();
        $roles = [
            'admin' => 1,
            'coordinator' => 2,
        ];
        if (!isset($roles[$role]) || (int) $user->role_as !== (int) $roles[$role]) {
            abort(403, 'Unauthorized access.');
        }
        return $next($request);
    }
}
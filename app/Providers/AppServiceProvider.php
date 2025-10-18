<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
{
    Vite::prefetch(concurrency: 3);

    Inertia::share([
        'auth' => fn () => [
            'user' => function () {
                // Check all guards
                $user = Auth::guard('web')->user()
                     ?? Auth::guard('student')->user()
                     ?? Auth::guard('company')->user();

                if (!$user) return null;

                return [
                    'id'        => $user->id,
                    'firstname' => $user->firstname ?? null,
                    'lastname'  => $user->lastname ?? null,
                    'email'     => $user->email ?? null,
                    'role'      => $user->role_as ?? null,
                ];
            },
        ],
    ]);
}

}
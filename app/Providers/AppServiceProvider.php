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

        // Safe way: only share user if logged in
        Inertia::share([
            'auth' => fn() => [
                'user' => Auth::check() ? [
                    'id'   => Auth::user()->id,
                    'name' => Auth::user()->name,
                    'role' => Auth::user()->role_as, // column name mo dito
                ] : null,
            ],
        ]);
    }
}

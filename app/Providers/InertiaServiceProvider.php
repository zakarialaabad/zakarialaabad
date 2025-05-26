<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => fn () => [
                'user' => Auth::user(),
            ],
            "favorites" => fn () => auth()->check()
                ? auth()->user()->favorites()->pluck('propriete_id')->toArray()
                : [],
            
        ]);
      
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Admin ke liye Sanctum me user resolve
        Auth::macro('adminGuard', function () {
            return Auth::guard('sanctum')->user();
        });
    }
}

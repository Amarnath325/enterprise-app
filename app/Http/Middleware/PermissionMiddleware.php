<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$permissions): Response
    {
        $user = auth()->user();

        if (! $user || ! method_exists($user, 'hasPermission')) {
            abort(403, 'Unauthorized.');
        }

        if (! $user->hasPermission($permissions)) {
            abort(403, 'Insufficient permission.');
        }

        return $next($request);
    }
}

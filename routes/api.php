<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\BusinessController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::prefix('admin')->group(function () {
        Route::apiResource('businesses', BusinessController::class);
        Route::patch('businesses/{business}/status', [BusinessController::class, 'toggleStatus']);
    });
});

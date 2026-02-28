<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Sirf "super-admin" role wale users
Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return 'Super Admin Dashboard';
    });
});

// Sirf "attendance.approve-leave" permission wale users
Route::middleware(['auth', 'permission:attendance.approve-leave'])->group(function () {
    Route::get('/leaves', function () {
        return 'Leaves list (only approvers can see this)';
    });

    Route::post('/leaves/{id}/approve', function ($id) {
        // yahan approve logic aayega
        return "Leave {$id} approved";
    });
});

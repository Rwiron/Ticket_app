<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController;



// Route for auth

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);

// Otp verfiy and resent m
Route::post('/verify-otp', [OtpController::class, 'verify']);
Route::post('/resend-otp', [OtpController::class, 'resend']);



// Protected routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});




// Only it_admin can access
Route::middleware(['auth:sanctum', 'role:it_admin'])->group(function () {

});

// Only employees can access
Route::middleware(['auth:sanctum', 'role:employee'])->group(function () {
  
});
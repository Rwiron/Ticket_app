<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Ticket\CommentController;
use App\Http\Controllers\Ticket\TicketController;

/*
|--------------------------------------------------------------------------
| Public Auth Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/verify-otp', [OtpController::class, 'verify']);
    Route::post('/resend-otp', [OtpController::class, 'resend']);
    Route::get('/check-email', [AuthController::class, 'checkEmail']);
});





Route::middleware('auth:sanctum')->group(function () {
    // 🔐 Logout + Profile
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    // 🔐 Authenticated users (any role)
    Route::post('/tickets/{id}/comments', [CommentController::class, 'store']);
    Route::get('/tickets/{id}/comments', [CommentController::class, 'index']);


    /*
    |--------------------------------------------------------------------------
    | Employee Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:employee')->group(function () {
        Route::post('/tickets', [TicketController::class, 'store']);       // Create a ticket
        Route::get('/my-tickets', [TicketController::class, 'myTickets']); // View own tickets
    });






    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:it_admin')->group(function () {
        Route::get('/tickets', [TicketController::class, 'index']);        // View all tickets
        Route::put('/tickets/{id}', [TicketController::class, 'update']);  // Update ticket (status, priority, assigned_to)
        Route::delete('/tickets/{id}', [TicketController::class, 'destroy']); // Delete a ticket
    });
});
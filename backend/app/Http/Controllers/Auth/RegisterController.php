<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


class RegisterController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            Log::info('User registration failed: Validation errors', ['email' => $request->email, 'errors' => $validator->errors()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // creating
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'employee',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        Log::info('User registered successfully', ['id' => $user->id, 'email' => $user->email]);

        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
            'token' => $token,
        ], 201);
    }
}

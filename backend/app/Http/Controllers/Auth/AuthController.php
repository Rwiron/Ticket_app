<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetMail;

class AuthController extends Controller
{
    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        $exists = User::where('email', $email)->exists();

        return response()->json([
            'status' => !$exists ? 'success' : 'error',
            'message' => !$exists ? 'Email is available to use' : 'Email is already taken',
            'available' => !$exists,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No user found with this email address'
                ], 404);
            }

            // Generate a unique token
            $token = Str::random(64);

            // Store the token in the database
            $user->update([
                'remember_token' => $token
            ]);

            // Send password reset email with correct frontend URL
            $resetUrl = 'http://localhost:5173/reset-password?token=' . $token . '&email=' . urlencode($user->email);

            Mail::to($user->email)->send(new PasswordResetMail($token, $resetUrl));

            Log::info('Password reset link sent', ['email' => $user->email]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password reset link has been sent to your email'
            ]);
        } catch (\Exception $e) {
            Log::error('Password reset error', [
                'email' => $request->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send password reset link. Please try again later.'
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $user = User::where('email', $request->email)
                ->where('remember_token', $request->token)
                ->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid or expired reset token'
                ], 400);
            }

            // Update password and clear token
            $user->update([
                'password' => Hash::make($request->password),
                'remember_token' => null
            ]);

            Log::info('Password reset successful', ['email' => $user->email]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password has been reset successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Password reset error', [
                'email' => $request->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to reset password. Please try again later.'
            ], 500);
        }
    }
}

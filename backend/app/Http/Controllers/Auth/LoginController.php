<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Otp;
use App\Mail\SendOtpMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{


    public function login(Request $request)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'email'    => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Find user UKoresheje First 
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            // Delete previous OTPs
            $user->otps()->delete();

            // Generate new OTP
            $otpCode = rand(100000, 999999);

            $otp = Otp::create([
                'user_id'    => $user->id,
                'code'       => $otpCode,
                'expires_at' => Carbon::now()->addMinutes(5),
            ]);

            // Try sending email
            Mail::to($user->email)->send(new SendOtpMail($otpCode));

            return response()->json([
                'message' => 'OTP sent to your email address. Please verify to complete login.',
            ]);
        } catch (\Throwable $e) {

            Log::error('Login OTP error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Something went wrong. Please try again.',
                'error' => 'Logged internally'
            ], 500);
        }
    }


    public function logout(Request $request)
    {
        try {

            if ($request->user()) {
                $request->user()->currentAccessToken()->delete();
            }

            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Something went wrong during logout.',
                'error' => 'Logged internally'
            ], 500);
        }
    }
}
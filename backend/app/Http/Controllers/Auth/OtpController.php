<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Otp;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;



class OtpController extends Controller
{
    /**
     * Verify the OTP and return an access token.
     */
    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('code', $request->otp)
            ->where('expires_at', '>', Carbon::now())
            ->latest()
            ->first();

        if (!$otp) {
            return response()->json(['message' => 'Invalid or expired OTP'], 401);
        }

        // OTP is valid — delete it
        $otp->delete();

        // Revoke previous tokens to enforce single session
        $user->tokens()->delete();

        // Generate new Sanctum token
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
            'token' => $token,
        ]);
    }


    public function resend(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $latestOtp = $user->otps()
                ->where('expires_at', '>', now())
                ->latest()
                ->first();

            $now = now();

            if ($latestOtp) {
                $cooldownSeconds = $now->diffInSeconds($latestOtp->last_sent_at);

                // ⛔ BLOCK if resend_count is 2 and cooldown is still active
                if ($latestOtp->resend_count >= 2 && $cooldownSeconds < 60) {
                    $remaining = 60 - $cooldownSeconds;

                    return response()->json([
                        'message' => "OTP resend limit reached. Please wait {$remaining} seconds.",
                    ], 429);
                }

                // ✅ RESET resend count if cooldown has passed
                if ($cooldownSeconds >= 60) {
                    $latestOtp->resend_count = 1;
                } else {
                    $latestOtp->resend_count += 1;
                }

                $latestOtp->last_sent_at = $now;
                $latestOtp->save();

                Mail::to($user->email)->send(new SendOtpMail($latestOtp->code));

                return response()->json([
                    'message' => 'A new OTP has been sent to your email address.',
                ]);
            }

            // No recent OTP, create new one
            $otpCode = rand(100000, 999999);

            Otp::create([
                'user_id'     => $user->id,
                'code'        => $otpCode,
                'expires_at'  => $now->addMinutes(5),
                'resend_count' => 1,
                'last_sent_at' => $now,
            ]);

            Mail::to($user->email)->send(new SendOtpMail($otpCode));

            return response()->json([
                'message' => 'OTP sent to your email address.',
            ]);
        } catch (\Throwable $e) {
            Log::error('Resend OTP error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Something went wrong while resending OTP.',
                'error' => 'Logged internally'
            ], 500);
        }
    }
}
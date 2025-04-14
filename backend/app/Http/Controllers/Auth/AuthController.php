<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

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
}

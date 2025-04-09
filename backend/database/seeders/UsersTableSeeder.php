<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make(env('USER_PASS')),
            'role' => 'it_admin',
            'remember_token' => Str::random(10),
        ]);


        User::factory()->count(1)->create([
            'role' => 'it_admin',
            'password' => Hash::make(env('USER_PASS')),

        ]);

        // Create 3 employee users
        User::factory()->count(5)->create([
            'role' => 'employee',
            'password' => Hash::make(env('USER_PASS')),
        ]);
    }
}
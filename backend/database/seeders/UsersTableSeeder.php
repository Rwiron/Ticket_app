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
            'password' => Hash::make('Dev@2002'),
            'role' => 'it_admin',
            'remember_token' => Str::random(10),
        ]);

        // optional: factory based users
        // This code creates 5 employee users using Laravel's factory system
        // We use factories to quickly generate test data with realistic values
        // The count(5) method specifies how many records to create
        // The create() method with the 'role' => 'employee' parameter ensures
        // all generated users have the employee role, which is needed for
        // testing the ticket system as shown in TicketsTableSeeder
        // Create 2 IT admin users
        User::factory()->count(1)->create([
            'role' => 'it_admin',
            'password' => Hash::make('Dev@2002'),
        ]);

        // Create 3 employee users
        User::factory()->count(5)->create([
            'role' => 'employee',
            'password' => Hash::make('Dev@2000'),
        ]);
    }
}
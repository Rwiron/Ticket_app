<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Models\User;

class TicketsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'employee')->get();
        $admins = User::where('role', 'it_admin')->get();

        foreach ($users as $user) {
            Ticket::create([
                'title' => 'Issue from ' . $user->name,
                'description' => 'Something is not working properly.',
                'status' => 'open',
                'priority' => 'medium',
                'user_id' => $user->id,
                'assigned_to' => $admins->random()->id ?? null,
            ]);
        }
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Ticket;
use App\Models\User;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tickets = Ticket::all();
        $users = User::all();

        foreach ($tickets as $ticket) {
            Comment::create([
                'message' => 'This is a test comment for ticket #' . $ticket->id,
                'user_id' => $users->random()->id,
                'ticket_id' => $ticket->id,
            ]);
        }
    }
}
<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\CommentsTableSeeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\TicketsTableSeeder;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    // public function run(): void
    // {
    //     // User::factory(10)->create();

    //     // User::factory()->create([
    //     //     'name' => 'Test User',
    //     //     'email' => 'test@example.com',
    //     // ]);


    //     $this->call([
    //         UsersTableSeeder::class,
    //         TicketsTableSeeder::class,
    //         CommentsTableSeeder::class,
    //     ]);
    // }

    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            TicketsTableSeeder::class,
            CommentsTableSeeder::class,
        ]);
    }
}
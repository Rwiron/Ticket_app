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
    
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            TicketsTableSeeder::class,
            CommentsTableSeeder::class,
        ]);
    }
}
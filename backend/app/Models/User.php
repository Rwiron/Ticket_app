<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'email_verified_at',
        'remember_token',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // 🔗 Tickets created by this user
    public function ticketsCreated()
    {
        return $this->hasMany(Ticket::class, 'user_id');
    }

    // 🔗 Tickets assigned to this user
    public function ticketsAssigned()
    {
        return $this->hasMany(Ticket::class, 'assigned_to');
    }

    // 🔗 Comments made by this user
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function otps()
    {
        return $this->hasMany(Otp::class);
    }
}
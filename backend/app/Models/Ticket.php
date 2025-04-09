<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'user_id',
        'assigned_to',
    ];

    // 🔗 Who created the ticket
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // 🔗 Who is assigned to the ticket
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // 🔗 Comments on the ticket
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
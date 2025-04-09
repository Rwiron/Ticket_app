<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'user_id',
        'ticket_id',
    ];

    // 🔗uwandika Comment
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 🔗 aho ticket the comment ijya
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
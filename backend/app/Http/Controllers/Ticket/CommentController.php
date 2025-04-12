<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Comment;
use App\Models\Ticket;

class CommentController extends Controller
{
    /**
     * Add a comment to a ticket (any role).
     */
    public function store(Request $request, $ticketId)
    {
        $ticket = Ticket::find($ticketId);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comment = Comment::create([
            'message'    => $request->message,
            'user_id'    => $request->user()->id,
            'ticket_id'  => $ticket->id,
        ]);

        return response()->json([
            'message' => 'Comment added successfully',
            'comment' => $comment,
        ], 201);
    }

    /**
     * Get all comments for a ticket (any role).
     */
    public function index($ticketId)
    {
        $ticket = Ticket::find($ticketId);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $comments = $ticket->comments()->with('user:id,name')->latest()->get();

        return response()->json([
            'comments' => $comments,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\TicketLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Ticket;
use App\Models\User;

class TicketController extends Controller
{
    /**
     * Create a new ticket (Employee only).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:100',
            'description' => 'required|string',
            'priority'    => 'in:low,medium,high,critical',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket = Ticket::create([
            'title'       => $request->title,
            'description' => $request->description,
            'priority'    => $request->priority ?? 'medium',
            'user_id'     => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Ticket created successfully',
            'ticket'  => $ticket,
        ], 201);
    }

    /**
     * View my tickets (Employee only).
     */
    public function myTickets(Request $request)
    {
        $tickets = Ticket::where('user_id', $request->user()->id)->latest()->get();

        return response()->json([
            'tickets' => $tickets
        ]);
    }

    /**
     * View all tickets (IT Admin only).
     */
    public function index()
    {
        $tickets = Ticket::with('creator')->latest()->get();

        return response()->json([
            'tickets' => $tickets
        ]);
    }

    /**
     * Update a ticket (IT Admin only).
     */
    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status'      => 'in:open,in_progress,resolved',
            'priority'    => 'in:low,medium,high,critical',
            'assigned_to' => 'exists:users,id|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Log changes BEFORE the update
        if ($request->has('status') && $request->status !== $ticket->status) {
            TicketLog::create([
                'ticket_id'   => $ticket->id,
                'user_id'     => $request->user()->id,
                'action'      => 'status_updated',
                'description' => "Status changed from {$ticket->status} to {$request->status}",
            ]);
        }

        if ($request->has('priority') && $request->priority !== $ticket->priority) {
            TicketLog::create([
                'ticket_id'   => $ticket->id,
                'user_id'     => $request->user()->id,
                'action'      => 'priority_updated',
                'description' => "Priority changed from {$ticket->priority} to {$request->priority}",
            ]);
        }

        if ($request->has('assigned_to') && $request->assigned_to !== $ticket->assigned_to) {
            $assignedUser = User::find($request->assigned_to);
            $assigneeName = $assignedUser ? $assignedUser->name : 'Removed';
            TicketLog::create([
                'ticket_id'   => $ticket->id,
                'user_id'     => $request->user()->id,
                'action'      => 'assigned_updated',
                'description' => "Ticket assigned to {$assigneeName}",
            ]);
        }

        // Perform the actual update
        $ticket->update($request->only('status', 'priority', 'assigned_to'));

        return response()->json([
            'message' => 'Ticket updated successfully',
            'ticket'  => $ticket
        ]);
    }

    /**
     * Delete a ticket (IT Admin only).
     */
    public function destroy($id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}
import React, { useState, useEffect } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import AdminTicketDetailModal from "../../components/ui/AdminTicketDetailModal";
import { useAuth } from "../../context/AuthContext";
import {
  getAdminTicketStats,
  getAllTickets,
} from "../../services/ticket/ticketService";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUsers,
  FaServer,
  FaPencilAlt,
  FaTrash,
  FaStickyNote,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    resolved: 0,
    high_priority: 0,
    users: 0,
  });
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useAuth();
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("dashboard_notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminTicketStats(token);
        //("API response:", data); // Debug log
        setAdminStats(data);
        setError(null);
      } catch (error) {
        console.error("Error loading admin stats", error);
        setError(error.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    const fetchAllTickets = async () => {
      try {
        const tickets = await getAllTickets(token);
        //("All tickets:", tickets); // Debug log
        setAllTickets(tickets || []);
      } catch (error) {
        console.error("Error fetching all tickets", error);
        // We won't set the main error state here to avoid hiding stats
      }
    };

    fetchStats();
    fetchAllTickets();
  }, [token]);

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTicketUpdated = (updatedTicket) => {
    // If updatedTicket is null, it means the ticket was deleted
    if (!updatedTicket) {
      // Remove the ticket from the list
      const updatedTickets = allTickets.filter(
        (ticket) => ticket.id !== selectedTicketId
      );
      setAllTickets(updatedTickets);
      setModalOpen(false);
    } else {
      // Update the ticket in the list
      const updatedTickets = allTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      );
      setAllTickets(updatedTickets);
    }

    // Refresh stats
    fetchStats();
  };

  const fetchStats = async () => {
    try {
      const data = await getAdminTicketStats(token);
      setAdminStats(data);
    } catch (error) {
      console.error("Error refreshing admin stats", error);
    }
  };

  // Notes functions
  const handleAddNote = () => {
    if (newNote.trim() === "") return;

    const note = {
      id: Date.now(),
      text: newNote,
      date: new Date().toLocaleString(),
      color: getRandomNoteColor(),
    };

    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    localStorage.setItem("dashboard_notes", JSON.stringify(updatedNotes));
    setNewNote("");
    setIsNoteModalOpen(false);
  };

  const getRandomNoteColor = () => {
    const colors = [
      "bg-blue-50 border-blue-200",
      "bg-green-50 border-green-200",
      "bg-yellow-50 border-yellow-200",
      "bg-purple-50 border-purple-200",
      "bg-pink-50 border-pink-200",
      "bg-indigo-50 border-indigo-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("dashboard_notes", JSON.stringify(updatedNotes));
    setSelectedNote(null);
    setIsNoteModalOpen(false);
  };

  const startEditNote = (note) => {
    setSelectedNote(note);
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
    setIsNoteModalOpen(true);
  };

  const handleUpdateNote = () => {
    if (editingNoteText.trim() === "") return;

    const updatedNotes = notes.map((note) =>
      note.id === editingNoteId
        ? {
            ...note,
            text: editingNoteText,
            date: new Date().toLocaleString() + " (edited)",
          }
        : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("dashboard_notes", JSON.stringify(updatedNotes));
    setEditingNoteId(null);
    setEditingNoteText("");
    setSelectedNote(null);
    setIsNoteModalOpen(false);
  };

  const openNewNoteModal = () => {
    setSelectedNote(null);
    setEditingNoteId(null);
    setEditingNoteText("");
    setNewNote("");
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setEditingNoteId(null);
    setEditingNoteText("");
    setSelectedNote(null);
  };

  return (
    <>
      <SectionHeader
        title="Admin Dashboard"
        subtitle="Manage tickets, users, and system performance"
        actionButton="Create Ticket"
      />

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          icon={<FaTicketAlt />}
          title="Total Tickets"
          value={adminStats.total?.toString() || "0"}
          loading={loading}
        />
        <StatCard
          icon={<FaUsers />}
          title="Active Users"
          value={adminStats.users?.toString() || "0"}
          loading={loading}
        />
        <StatCard
          icon={<FaClock />}
          title="In Progress"
          value={adminStats.in_progress?.toString() || "0"}
          loading={loading}
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          title="High Priority"
          value={adminStats.high_priority?.toString() || "0"}
          loading={loading}
        />
      </div>

      {/* Main Content Area - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Ticket Status Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ticket Status Overview
            </h3>
            <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center px-4 w-full">
                <p className="text-gray-500 mb-4">
                  Ticket distribution by status
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {adminStats.open || 0}
                    </div>
                    <div className="text-sm text-blue-700">Open</div>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {adminStats.in_progress || 0}
                    </div>
                    <div className="text-sm text-yellow-700">In Progress</div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {adminStats.resolved || 0}
                    </div>
                    <div className="text-sm text-green-700">Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Tickets Table */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                All Tickets
              </h3>
              <a href="#" className="text-[#00b2ef] text-sm hover:underline">
                Manage Tickets
              </a>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full px-4 sm:px-0">
                <TicketTable
                  tickets={allTickets}
                  onRowClick={handleTicketClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 sm:space-y-8">
          {/* Notes Card - Modern Ultra Design */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaStickyNote className="mr-2 text-[#00b2ef]" />
                Quick Notes
              </h3>
              <button
                onClick={openNewNoteModal}
                className="bg-[#00b2ef] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#0094cb] transition-all transform hover:scale-110 shadow-md"
              >
                <FaPlus size={12} />
              </button>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto custom-scrollbar pb-2">
              {notes.length === 0 ? (
                <div className="col-span-2 p-8 border border-dashed border-gray-200 rounded-xl text-center">
                  <FaStickyNote
                    className="mx-auto text-gray-300 mb-3"
                    size={24}
                  />
                  <p className="text-sm text-gray-500">
                    No notes yet. Click the + button to create one!
                  </p>
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className={`border rounded-xl p-3 ${
                      note.color || "bg-gray-50 border-gray-100"
                    } hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1`}
                    onClick={() => startEditNote(note)}
                  >
                    <p className="text-sm mb-2 line-clamp-3 break-words">
                      {note.text}
                    </p>
                    <div className="flex justify-end">
                      <span className="text-xs text-gray-500 italic">
                        {note.date.includes("edited")
                          ? "Edited " + note.date.split("(edited)")[0]
                          : note.date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              System Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm font-medium text-yellow-800">
                  Scheduled Maintenance
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Tomorrow at 02:00 AM
                </p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm font-medium text-blue-800">
                  New Update Available
                </p>
                <p className="text-xs text-blue-700 mt-1">Version 1.1.0</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="text-sm font-medium text-green-800">
                  Database Backup Complete
                </p>
                <p className="text-xs text-green-700 mt-1">Today at 04:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-transparent z-50 flex items-center justify-center p-4">
          <div
            className="bg-white/90 rounded-2xl shadow-xl w-full max-w-md transform transition-all animation-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaStickyNote className="mr-2 text-[#00b2ef]" />
                {selectedNote ? "Edit Note" : "New Note"}
              </h3>
              <button
                onClick={closeNoteModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="p-5">
              <textarea
                value={selectedNote ? editingNoteText : newNote}
                onChange={(e) =>
                  selectedNote
                    ? setEditingNoteText(e.target.value)
                    : setNewNote(e.target.value)
                }
                placeholder="Type your note here..."
                className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent transition-all resize-none"
                rows={6}
                autoFocus
              />

              <div className="flex justify-between mt-6">
                {selectedNote && (
                  <button
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    className="px-4 py-2 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center"
                  >
                    <FaTrash size={12} className="mr-2" />
                    Delete
                  </button>
                )}

                <div className={`${selectedNote ? "" : "ml-auto"}`}>
                  <button
                    onClick={closeNoteModal}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={selectedNote ? handleUpdateNote : handleAddNote}
                    className="px-4 py-2 bg-[#00b2ef] text-white rounded-lg text-sm font-medium hover:bg-[#0094cb] transition-colors"
                  >
                    {selectedNote ? "Save Changes" : "Add Note"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Ticket Detail Modal */}
      <AdminTicketDetailModal
        ticketId={selectedTicketId}
        open={modalOpen}
        onClose={handleCloseModal}
        onTicketUpdated={handleTicketUpdated}
      />
    </>
  );
};

export default AdminDashboard;

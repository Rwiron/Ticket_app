import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import {
  getTicketById,
  getComments,
  postComment,
  updateTicket,
  deleteTicket,
} from "../../services/ticket/ticketService";
import { getAllUsers } from "../../services/user/userService";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaPaperPlane,
  FaTicketAlt,
  FaCalendarAlt,
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaTag,
  FaClock,
  FaUserCog,
  FaSave,
  FaExclamationTriangle,
  FaTrash,
  FaUserShield,
  FaComment,
  FaBell,
  FaInfoCircle,
} from "react-icons/fa";

import { showSuccess, showError } from "../../utils/toast";
import { Toaster } from "react-hot-toast";

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const AdminTicketDetailModal = ({
  ticketId,
  open,
  onClose,
  onTicketUpdated,
}) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [updatingTicket, setUpdatingTicket] = useState(false);
  const [deletingTicket, setDeletingTicket] = useState(false);
  const { token } = useAuth();

  // Edit form state
  const [editedTicket, setEditedTicket] = useState({
    status: "",
    priority: "",
    assigned_to: null,
  });

  useEffect(() => {
    if (ticketId && open) {
      fetchTicket();
      fetchComments();
      fetchUsers();
    }
  }, [ticketId, open]);

  // Update form when ticket data changes
  useEffect(() => {
    if (ticket) {
      setEditedTicket({
        status: ticket.status || "open",
        priority: ticket.priority || "medium",
        assigned_to: ticket.assigned_to || null,
      });
    }
  }, [ticket]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const userData = await getAllUsers(token);
      setUsers(userData || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const data = await getTicketById(ticketId, token);
      setTicket(data);
      console.log("Ticket data:", data);
    } catch (err) {
      console.error("Failed to load ticket:", err);
      showError("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!ticketId) return;

    setLoadingComments(true);
    try {
      const data = await getComments(ticketId, token);
      setComments(data || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const comment = await postComment(ticketId, newComment, token);
      setComments([...comments, comment]);
      setNewComment("");
      showSuccess("Comment added successfully");
    } catch (err) {
      console.error("Failed to add comment:", err);
      showError("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpdateTicket = async () => {
    setUpdatingTicket(true);
    try {
      const updatedTicket = await updateTicket(ticketId, editedTicket, token);
      setTicket(updatedTicket);
      showSuccess("Ticket updated successfully");
      if (onTicketUpdated) {
        onTicketUpdated(updatedTicket);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update ticket:", err);
      showError("Failed to update ticket");
    } finally {
      setUpdatingTicket(false);
    }
  };

  const handleDeleteTicket = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this ticket? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeletingTicket(true);
    try {
      await deleteTicket(ticketId, token);
      showSuccess("Ticket deleted successfully");
      onClose();
      if (onTicketUpdated) {
        // Refresh the ticket list
        onTicketUpdated(null);
      }
    } catch (err) {
      console.error("Failed to delete ticket:", err);
      showError("Failed to delete ticket");
    } finally {
      setDeletingTicket(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket({
      ...editedTicket,
      [name]:
        name === "assigned_to"
          ? value === "null"
            ? null
            : parseInt(value)
          : value,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  };

  // Format ISO date to a more readable format
  const formatISODate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "open":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200";
      case "closed":
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200";
      case "in_progress":
        return "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200";
      case "resolved":
        return "bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 border border-teal-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200";
      case "medium":
        return "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200";
      case "low":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <BaseModal
        open={open}
        handleClose={onClose}
        title={`Admin Ticket #${ticketId}`}
        icon={<FaUserShield className="text-blue-500" />}
        size="lg"
      >
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : ticket ? (
          <div className="space-y-6">
            {/* Two column layout for main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main ticket info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Ticket Header */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        ticket.status
                      )}`}
                    >
                      {ticket.status
                        ?.split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority?.charAt(0).toUpperCase() +
                        ticket.priority?.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto flex items-center">
                      <FaCalendarAlt className="mr-1 text-blue-400" />
                      Created: {formatISODate(ticket.created_at)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    {ticket.title || ticket.subject}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200 shadow-inner">
                    {ticket.description}
                  </p>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="font-medium mb-4 flex items-center border-b pb-3 text-gray-700">
                    <FaComment className="mr-2 text-blue-500" />
                    Comments ({comments.length})
                  </h3>

                  {/* Comment Section Container */}
                  <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    {loadingComments ? (
                      <div className="flex justify-center items-center py-10 bg-white">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : comments.length > 0 ? (
                      <div className="max-h-[320px] overflow-y-auto custom-scrollbar bg-white p-4">
                        <div className="space-y-4">
                          {comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-md"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                                  <FaUser size={15} />
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-gray-800">
                                    {comment.user?.name || "Unknown User"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {formatDate(comment.created_at)}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-line pl-12 border-l-2 border-blue-200 py-1">
                                {comment.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 px-4 bg-white">
                        <FaComment className="text-gray-300 mb-3" size={30} />
                        <p className="text-gray-500 text-center">
                          No comments yet. Be the first to add a comment.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* New Comment Form */}
                  <form
                    onSubmit={handleSubmitComment}
                    className="mt-4 flex flex-col space-y-3"
                  >
                    <div className="relative">
                      <textarea
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm"
                        rows="3"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={submittingComment}
                      ></textarea>
                      <FaUser className="absolute top-4 left-3 text-blue-400" />
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-5 py-2 text-sm inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!newComment.trim() || submittingComment}
                      >
                        {submittingComment ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        ) : (
                          <FaPaperPlane className="mr-2" size={12} />
                        )}
                        {submittingComment ? "Sending..." : "Add Comment"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column - Admin Edit Form */}
              <div className="space-y-6">
                {/* Ticket Management */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="font-medium mb-4 flex items-center border-b pb-3 text-gray-700">
                    <FaUserCog className="mr-2 text-blue-500" />
                    Ticket Management
                  </h3>

                  <div className="space-y-4">
                    {/* Status Dropdown */}
                    <div className="form-group">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Status
                      </label>
                      <div className="relative">
                        <select
                          id="status"
                          name="status"
                          value={editedTicket.status}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none shadow-sm"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Priority Dropdown */}
                    <div className="form-group">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Priority
                      </label>
                      <div className="relative">
                        <select
                          id="priority"
                          name="priority"
                          value={editedTicket.priority}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none shadow-sm"
                        >
                          {priorityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Assign To Dropdown */}
                    <div className="form-group">
                      <label
                        htmlFor="assigned_to"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Assign To
                      </label>
                      <div className="relative">
                        <select
                          id="assigned_to"
                          name="assigned_to"
                          value={
                            editedTicket.assigned_to === null
                              ? "null"
                              : editedTicket.assigned_to
                          }
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none shadow-sm"
                          disabled={loadingUsers}
                        >
                          <option value="null">Unassigned</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                        {loadingUsers && (
                          <div className="text-sm text-gray-500 mt-1 flex items-center">
                            <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                            Loading users...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={handleUpdateTicket}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-4 py-2.5 text-sm flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        disabled={updatingTicket}
                      >
                        {updatingTicket ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        ) : (
                          <FaSave className="mr-2" size={12} />
                        )}
                        {updatingTicket ? "Saving..." : "Update Ticket"}
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={handleDeleteTicket}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg px-4 py-2.5 text-sm flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        disabled={deletingTicket}
                      >
                        {deletingTicket ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        ) : (
                          <FaTrash className="mr-2" size={12} />
                        )}
                        {deletingTicket ? "Deleting..." : "Delete Ticket"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ticket Info */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="font-medium mb-4 flex items-center border-b pb-3 text-gray-700">
                    <FaInfoCircle className="mr-2 text-blue-500" />
                    Ticket Information
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="text-gray-500 w-24 flex-shrink-0 flex items-center">
                        <FaTicketAlt className="mr-2 text-blue-400" size={12} />
                        Ticket ID:
                      </div>
                      <div className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                        {ticket.id}
                      </div>
                    </div>

                    <div className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="text-gray-500 w-24 flex-shrink-0 flex items-center">
                        <FaCalendarAlt
                          className="mr-2 text-blue-400"
                          size={12}
                        />
                        Created:
                      </div>
                      <div className="text-gray-700">
                        {formatISODate(ticket.created_at)}
                      </div>
                    </div>

                    <div className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="text-gray-500 w-24 flex-shrink-0 flex items-center">
                        <FaClock className="mr-2 text-blue-400" size={12} />
                        Updated:
                      </div>
                      <div className="text-gray-700">
                        {formatISODate(ticket.updated_at)}
                      </div>
                    </div>

                    <div className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="text-gray-500 w-24 flex-shrink-0 flex items-center">
                        <FaUser className="mr-2 text-blue-400" size={12} />
                        Creator:
                      </div>
                      <div className="font-medium text-gray-700">
                        {ticket.creator?.name || "Unknown"}
                      </div>
                    </div>

                    {ticket.creator?.email && (
                      <div className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="text-gray-500 w-24 flex-shrink-0 flex items-center">
                          <FaEnvelope
                            className="mr-2 text-blue-400"
                            size={12}
                          />
                          Email:
                        </div>
                        <div className="text-blue-600 underline break-all hover:text-blue-800 transition-colors">
                          <a href={`mailto:${ticket.creator.email}`}>
                            {ticket.creator.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FaExclamationTriangle className="text-yellow-500 mb-5" size={50} />
            <p className="text-gray-700 text-center text-lg font-medium">
              Ticket not found or you don't have permission to view it.
            </p>
            <p className="text-gray-500 text-center mt-2">
              Please try again or contact an administrator.
            </p>
          </div>
        )}
      </BaseModal>
    </>
  );
};

export default AdminTicketDetailModal;

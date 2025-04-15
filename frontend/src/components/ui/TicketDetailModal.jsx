import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import {
  getTicketById,
  getComments,
  postComment,
} from "../../services/ticket/ticketService";
import { getUserById } from "../../services/user/userService";
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
} from "react-icons/fa";
import { showSuccess, showError } from "../../utils/toast";

const TicketDetailModal = ({ ticketId, open, onClose }) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [assignedUser, setAssignedUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (ticketId && open) {
      fetchTicket();
      fetchComments();
    }
  }, [ticketId, open]);

  useEffect(() => {
    // Fetch assigned user when ticket is loaded and has assigned_to property
    if (ticket && ticket.assigned_to) {
      fetchAssignedUser(ticket.assigned_to);
    }
  }, [ticket]);

  const fetchAssignedUser = async (userId) => {
    try {
      const userData = await getUserById(userId, token);
      setAssignedUser(userData);
    } catch (err) {
      console.error("Failed to load assigned user:", err);
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
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "closed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "in_progress":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <BaseModal
      open={open}
      handleClose={onClose}
      title={`Ticket #${ticketId}`}
      icon={<FaTicketAlt />}
    >
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : ticket ? (
        <div className="space-y-6">
          {/* Two column layout for main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main ticket info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ticket Header */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
                    <FaCalendarAlt className="mr-1" />
                    Created: {formatISODate(ticket.created_at)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  {ticket.title || ticket.subject}
                </h2>
                <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {ticket.description}
                </p>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-4 flex items-center border-b pb-3">
                  <FaUser className="mr-2 text-blue-500" />
                  Comments ({comments.length})
                </h3>

                {/* Comment Section Container */}
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  {loadingComments ? (
                    <div className="flex justify-center items-center py-10 bg-white">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                  ) : comments.length > 0 ? (
                    <div className="max-h-[320px] overflow-y-auto custom-scrollbar bg-white p-4">
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                                <FaUser size={15} />
                              </div>
                              <div>
                                <div className="font-medium text-sm">
                                  {comment.user?.name || "Unknown User"}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatDate(comment.created_at)}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 whitespace-pre-line pl-12 border-l-2 border-gray-200 py-1">
                              {comment.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm text-center py-10 bg-white flex flex-col items-center">
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <FaUser className="text-gray-400" size={20} />
                      </div>
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>

                {/* Add Comment Form */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <form
                    onSubmit={handleSubmitComment}
                    className="flex flex-col space-y-3"
                  >
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 placeholder:text-gray-400 resize-none bg-gray-50"
                      rows={3}
                      disabled={submittingComment}
                    ></textarea>
                    <button
                      type="submit"
                      disabled={!newComment.trim() || submittingComment}
                      className={`self-end flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                        !newComment.trim() || submittingComment
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-md transition-all"
                      }`}
                    >
                      {submittingComment ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane size={12} />
                          <span>Post Comment</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Column - Metadata and details */}
            <div className="space-y-6">
              {/* Ticket Metadata */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-5 pb-2 border-b">
                  Ticket Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mr-3 shadow-sm">
                      <FaIdCard size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Ticket ID</p>
                      <p className="font-medium bg-gray-100 px-3 py-1 rounded-lg inline-block">
                        {ticket.id}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mr-3 shadow-sm">
                      <FaUser size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">User ID</p>
                      <p className="font-medium bg-gray-100 px-3 py-1 rounded-lg inline-block">
                        {ticket.user_id}
                      </p>
                    </div>
                  </div> */}

                  {ticket.assigned_to && (
                    <div className="flex items-start">
                      <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-3 shadow-sm">
                        <FaUserCog size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Assigned To
                        </p>
                        <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm inline-flex items-center">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 shadow-sm">
                            <FaUser size={10} className="text-blue-500" />
                          </div>
                          {assignedUser
                            ? assignedUser.name
                            : `Agent #${ticket.assigned_to}`}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mr-3 shadow-sm">
                      <FaTag size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className="font-medium capitalize bg-gray-100 px-3 py-1 rounded-lg inline-block">
                        {ticket.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mr-3 shadow-sm">
                      <FaClock size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                      <p className="text-sm bg-gray-100 px-3 py-1 rounded-lg inline-block">
                        {formatISODate(ticket.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Information */}
              {ticket.creator && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-5 pb-2 border-b flex items-center">
                    <FaUserCircle className="mr-2 text-blue-500" />
                    Created By
                  </h3>

                  <div className="flex items-center mb-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-500 mr-4 shadow-sm">
                      <FaUser size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {ticket.creator.name}
                      </p>
                      <div className="text-sm text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full inline-block mt-1">
                        {ticket.creator.role}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                      <FaEnvelope className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="truncate">{ticket.creator.email}</span>
                    </div>

                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                      <FaIdCard className="w-5 h-5 mr-3 text-gray-400" />
                      <span>ID: {ticket.creator.id}</span>
                    </div>

                    <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                      <FaCalendarAlt className="w-5 h-5 mr-3 text-gray-400" />
                      <span>
                        Joined: {formatISODate(ticket.creator.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500">Ticket not found</p>
        </div>
      )}
    </BaseModal>
  );
};

export default TicketDetailModal;

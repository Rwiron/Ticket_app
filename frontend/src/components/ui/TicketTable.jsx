// components/dashui/TicketTable.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaTicketAlt,
  FaSearch,
  FaFilePdf,
  FaFileExcel,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
} from "react-icons/fa";
import { getMyTickets } from "../../services/ticket/ticketService";
import { useAuth } from "../../context/AuthContext";
import { showError, showSuccess } from "../../utils/toast";
import Button from "../../components/Button";

// Initialize export variables
let jsPDF = null;
let XLSX = null;

// Check if we're in the browser environment
if (typeof window !== "undefined") {
  // Import dependencies
  Promise.all([import("jspdf"), import("xlsx")])
    .then(([jspdfModule, xlsxModule]) => {
      jsPDF = jspdfModule.default;
      XLSX = xlsxModule;
      console.log("Export libraries loaded successfully");
    })
    .catch((error) => {
      console.error("Error loading export libraries:", error);
    });
}

const TicketTable = ({ tickets: propTickets, refreshTrigger }) => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [canExport, setCanExport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const searchInputRef = useRef(null);

  // Check if export libraries are loaded
  useEffect(() => {
    const checkExportCapabilities = () => {
      setCanExport(Boolean(jsPDF && XLSX));
    };

    checkExportCapabilities();

    // Check again after a short delay to allow dynamic imports to complete
    const timer = setTimeout(checkExportCapabilities, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Focus the search input when component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // If tickets are provided as props, use those instead of fetching
    if (Array.isArray(propTickets) && propTickets.length > 0) {
      setTickets(propTickets);
      setFilteredTickets(propTickets);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch tickets from the API
    fetchTickets();
  }, [propTickets, refreshTrigger, token]);

  // Filter tickets when search term, status filter, or priority filter changes
  useEffect(() => {
    filterTickets();
  }, [searchTerm, statusFilter, priorityFilter, tickets]);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const fetchedTickets = await getMyTickets(token);
      setTickets(fetchedTickets);
      setFilteredTickets(fetchedTickets);
      setIsLoading(false);
    } catch (error) {
      showError("Failed to load tickets");
      console.error("Error fetching tickets:", error);
      setIsLoading(false);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          (ticket.title && ticket.title.toLowerCase().includes(term)) ||
          (ticket.subject && ticket.subject.toLowerCase().includes(term)) ||
          (ticket.description &&
            ticket.description.toLowerCase().includes(term)) ||
          (ticket.status && ticket.status.toLowerCase().includes(term)) ||
          (ticket.priority && ticket.priority.toLowerCase().includes(term)) ||
          (ticket.id && ticket.id.toString().includes(term))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.priority === priorityFilter
      );
    }

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = typeof status === "string" ? status.toLowerCase() : "";

    switch (statusLower) {
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

  // Format status for display
  const formatStatus = (status) => {
    if (!status) return "Unknown";

    // Convert snake_case to Title Case (e.g., in_progress → In Progress)
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredTickets].sort((a, b) => {
      if (!a[key] && !b[key]) return 0;
      if (!a[key]) return 1;
      if (!b[key]) return -1;

      const valueA = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
      const valueB = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];

      if (valueA < valueB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredTickets(sortedData);
  };

  // Get the appropriate sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key)
      return <FaSort className="ml-1 text-gray-400 text-xs" />;
    return sortConfig.direction === "ascending" ? (
      <FaSortUp className="ml-1 text-blue-500 text-xs" />
    ) : (
      <FaSortDown className="ml-1 text-blue-500 text-xs" />
    );
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!jsPDF) {
      showError(
        "PDF export is not available. Please install jspdf and jspdf-autotable packages."
      );
      return;
    }

    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("Ticket Report", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

      // Create table data
      const tableColumn = ["ID", "Subject", "Priority", "Status", "Created"];
      const tableRows = [];

      filteredTickets.forEach((ticket) => {
        const ticketData = [
          ticket.id.toString(),
          ticket.title || ticket.subject,
          ticket.priority,
          formatStatus(ticket.status),
          ticket.created_at
            ? new Date(ticket.created_at).toLocaleDateString()
            : "N/A",
        ];
        tableRows.push(ticketData);
      });

      // Use the autoTable function from the imported module
      import("jspdf-autotable")
        .then((module) => {
          const autoTable = module.default;
          autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 9 },
            columnStyles: { 0: { cellWidth: 15 } },
            headStyles: { fillColor: [0, 178, 239] },
          });

          doc.save("tickets.pdf");
          showSuccess("PDF exported successfully");
        })
        .catch((error) => {
          console.error("Error applying autoTable:", error);
          showError("Failed to generate PDF table");
        });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      showError("Failed to export PDF");
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!XLSX) {
      showError("Excel export is not available. Please install xlsx package.");
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(
        filteredTickets.map((ticket) => ({
          ID: ticket.id,
          Subject: ticket.title || ticket.subject,
          Description: ticket.description,
          Priority: ticket.priority,
          Status: formatStatus(ticket.status),
          Created: ticket.created_at
            ? new Date(ticket.created_at).toLocaleDateString()
            : "N/A",
        }))
      );

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
      XLSX.writeFile(workbook, "tickets.xlsx");
      showSuccess("Excel file exported successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      showError("Failed to export Excel file");
    }
  };

  // Get unique status values for filters
  const getUniqueStatuses = () => {
    const statuses = new Set(
      tickets.map((ticket) => ticket.status).filter(Boolean)
    );
    return Array.from(statuses);
  };

  // Get unique priority values for filters
  const getUniquePriorities = () => {
    const priorities = new Set(
      tickets.map((ticket) => ticket.priority).filter(Boolean)
    );
    return Array.from(priorities);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm">
        <FaTicketAlt className="mx-auto text-gray-300 text-5xl mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No tickets found
        </h3>
        <p className="text-gray-500 mb-6">
          Create your first ticket to get started
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors">
          Create New Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 self-end lg:self-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <FaFilter className={showFilters ? "text-blue-500" : ""} />
              <span>Filters</span>
            </button>

            {canExport && (
              <>
                <button
                  onClick={exportToPDF}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <FaFilePdf />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button
                  onClick={exportToExcel}
                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <FaFileExcel />
                  <span className="hidden sm:inline">Excel</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter panel - collapsible */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-3 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                {getUniqueStatuses().map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                {getUniquePriorities().map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <FaSearch className="mx-auto text-gray-300 text-4xl mb-3" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No results found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="space-y-3 md:hidden">
            {currentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border rounded-xl p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    #{ticket.id}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      ticket.status
                    )}`}
                  >
                    {formatStatus(ticket.status)}
                  </span>
                </div>
                <p className="font-medium text-gray-800 mb-3">
                  {ticket.title || ticket.subject}
                </p>
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Priority</span>
                    <span className="font-medium capitalize">
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium">
                      {ticket.created_at
                        ? new Date(ticket.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-hidden bg-white rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th
                      className="p-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => requestSort("id")}
                    >
                      <div className="flex items-center">
                        ID {getSortIndicator("id")}
                      </div>
                    </th>
                    <th
                      className="p-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => requestSort("title")}
                    >
                      <div className="flex items-center">
                        Subject {getSortIndicator("title")}
                      </div>
                    </th>
                    <th
                      className="p-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => requestSort("priority")}
                    >
                      <div className="flex items-center">
                        Priority {getSortIndicator("priority")}
                      </div>
                    </th>
                    <th
                      className="p-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => requestSort("status")}
                    >
                      <div className="flex items-center">
                        Status {getSortIndicator("status")}
                      </div>
                    </th>
                    <th
                      className="p-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => requestSort("created_at")}
                    >
                      <div className="flex items-center">
                        Created {getSortIndicator("created_at")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTickets.map((ticket, index) => (
                    <tr
                      key={ticket.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-100 text-sm">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {ticket.id}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-100 text-sm font-medium text-gray-800">
                        {ticket.title || ticket.subject}
                      </td>
                      <td className="p-4 border-b border-gray-100 text-sm">
                        <span
                          className={`capitalize ${
                            ticket.priority === "high"
                              ? "text-red-600 font-medium"
                              : ticket.priority === "medium"
                              ? "text-amber-600"
                              : "text-gray-600"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-100 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            ticket.status
                          )}`}
                        >
                          {formatStatus(ticket.status)}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-100 text-sm text-gray-500">
                        {ticket.created_at
                          ? new Date(ticket.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 order-2 sm:order-1">
              Showing {indexOfFirstTicket + 1}-
              {Math.min(indexOfLastTicket, filteredTickets.length)} of{" "}
              {filteredTickets.length} tickets
            </div>
            <div className="flex space-x-1 order-1 sm:order-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                <FaChevronLeft size={14} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map(
                (_, index) => {
                  let pageNum;
                  // Logic to show current page in the middle when possible
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }

                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                }
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                <FaChevronRight size={14} />
              </button>
            </div>

            <div className="hidden sm:block order-3">
              <select
                className="border border-gray-300 rounded-lg p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketTable;

// components/dashui/TicketTable.jsx
import React from "react";

const TicketTable = () => {
  const tickets = [
    {
      id: 1,
      subject: "Login issue with mobile app",
      status: "Open",
      priority: "High",
    },
    {
      id: 2,
      subject: "Billing bug in checkout process",
      status: "Closed",
      priority: "Medium",
    },
    {
      id: 3,
      subject: "Feature request: Dark mode",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: 4,
      subject: "Dashboard loading error",
      status: "Open",
      priority: "High",
    },
    {
      id: 5,
      subject: "Account verification failed",
      status: "Closed",
      priority: "Medium",
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-[#00b2ef]/10 text-[#00b2ef]";
      case "Closed":
        return "bg-[#0ca74f]/10 text-[#0ca74f]";
      case "In Progress":
        return "bg-[#e8c745]/10 text-[#e8c745]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Mobile View - Cards */}
      <div className="space-y-3 md:hidden">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border rounded-lg p-3 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">Ticket #{ticket.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>
            <p className="font-medium text-sm mb-2">{ticket.subject}</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Priority:</span>
              <span className="font-medium">{ticket.priority}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 border-b font-medium text-gray-600">ID</th>
              <th className="p-4 border-b font-medium text-gray-600">
                Subject
              </th>
              <th className="p-4 border-b font-medium text-gray-600">
                Priority
              </th>
              <th className="p-4 border-b font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="p-4 border-b text-sm">{ticket.id}</td>
                <td className="p-4 border-b text-sm font-medium">
                  {ticket.subject}
                </td>
                <td className="p-4 border-b text-sm">{ticket.priority}</td>
                <td className="p-4 border-b text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketTable;

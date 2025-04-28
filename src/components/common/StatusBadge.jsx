import React from "react";
import PropTypes from "prop-types";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    suspended: "bg-gray-100 text-gray-800",
  };

  const statusText = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    suspended: "Suspended",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusText[status.toLowerCase()] || status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;

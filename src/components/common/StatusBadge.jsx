import React from "react";

const DEFAULT_STATUSES = {
  AVAILABLE: {
    label: "Available",
    background: "#dcfce7",
    color: "#166534",
    dot: "#22c55e",
  },

  UNAVAILABLE: {
    label: "Unavailable",
    background: "#fee2e2",
    color: "#991b1b",
    dot: "#ef4444",
  },

  ASSIGNED: {
    label: "Assigned",
    background: "#fef3c7",
    color: "#92400e",
    dot: "#f59e0b",
  },

  EN_ROUTE: {
    label: "En Route",
    background: "#dbeafe",
    color: "#1e40af",
    dot: "#3b82f6",
  },

  ARRIVED: {
    label: "Arrived",
    background: "#ede9fe",
    color: "#5b21b6",
    dot: "#8b5cf6",
  },

  ACCEPTED: {
    label: "Accepted",
    background: "#dcfce7",
    color: "#166534",
    dot: "#22c55e",
  },

  REJECTED: {
    label: "Rejected",
    background: "#fee2e2",
    color: "#991b1b",
    dot: "#ef4444",
  },

  PENDING: {
    label: "Pending",
    background: "#fef3c7",
    color: "#92400e",
    dot: "#f59e0b",
  },

  OFFLINE: {
    label: "Offline",
    background: "#f3f4f6",
    color: "#4b5563",
    dot: "#6b7280",
  },
};

const StatusBadge = ({
  status = "PENDING",
  label,
  customStatus,
  showDot = true,
  size = "medium",
  uppercase = false,
}) => {
  const normalizedStatus = String(status).toUpperCase();

  const statusInfo =
    customStatus ||
    DEFAULT_STATUSES[normalizedStatus] ||
    {
      label: status,
      background: "#f3f4f6",
      color: "#374151",
      dot: "#6b7280",
    };

  const sizeStyles = {
    small: {
      padding: "3px 7px",
      fontSize: "10px",
      dotSize: "6px",
    },

    medium: {
      padding: "5px 9px",
      fontSize: "12px",
      dotSize: "7px",
    },

    large: {
      padding: "7px 12px",
      fontSize: "13px",
      dotSize: "8px",
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: currentSize.padding,
        borderRadius: "999px",
        backgroundColor: statusInfo.background,
        color: statusInfo.color,
        fontSize: currentSize.fontSize,
        fontWeight: "600",
        whiteSpace: "nowrap",
      }}
    >
      {showDot && (
        <span
          style={{
            width: currentSize.dotSize,
            height: currentSize.dotSize,
            borderRadius: "50%",
            backgroundColor: statusInfo.dot,
            display: "inline-block",
          }}
        />
      )}

      {uppercase
        ? (label || statusInfo.label).toUpperCase()
        : label || statusInfo.label}
    </span>
  );
};

export default StatusBadge;

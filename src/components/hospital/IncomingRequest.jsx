import React, { useState } from "react";

const IncomingRequest = ({ requests }) => {
  const [requestList, setRequestList] = useState(
    requests || [
      {
        id: 1,
        patientName: "Arun Kumar",
        requestType: "Bed Request",
        department: "Emergency",
        priority: "High",
        message: "Requires ICU bed immediately",
        time: "5 mins ago",
        status: "Pending",
      },
      {
        id: 2,
        patientName: "Priya Sharma",
        requestType: "Doctor Request",
        department: "Cardiology",
        priority: "Medium",
        message: "Needs cardiologist consultation",
        time: "15 mins ago",
        status: "Pending",
      },
      {
        id: 3,
        patientName: "Rahul Verma",
        requestType: "Bed Request",
        department: "General Ward",
        priority: "Low",
        message: "Requires general ward bed",
        time: "30 mins ago",
        status: "Pending",
      },
    ]
  );

  const getPriorityStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      case "low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAccept = (id) => {
    setRequestList((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, status: "Accepted" }
          : request
      )
    );
  };

  const handleReject = (id) => {
    setRequestList((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, status: "Rejected" }
          : request
      )
    );
  };

  const pendingCount = requestList.filter(
    (request) => request.status === "Pending"
  ).length;

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Incoming Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage requests received by the hospital
          </p>
        </div>

        {/* Pending Count */}
        <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {pendingCount} Pending
        </div>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {requestList.length > 0 ? (
          requestList.map((request) => (
            <div
              key={request.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition hover:bg-gray-100"
            >
              {/* Top Section */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Patient Info */}
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {request.patientName
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {request.patientName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {request.requestType}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {request.department} • {request.time}
                    </p>
                  </div>
                </div>

                {/* Priority + Status */}
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                      request.priority
                    )}`}
                  >
                    {request.priority} Priority
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="mt-4 rounded-lg bg-white p-3">
                <p className="text-sm text-gray-600">
                  {request.message}
                </p>
              </div>

              {/* Actions */}
              {request.status === "Pending" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(request.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-gray-50 p-10 text-center">
            <div className="mb-3 text-4xl">
              ✓
            </div>

            <h3 className="font-semibold text-gray-700">
              No Incoming Requests
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              There are currently no requests to review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomingRequest;

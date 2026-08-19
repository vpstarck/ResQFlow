import React from "react";

const DoctorStatus = ({ doctors }) => {
  const doctorData = doctors || [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      department: "Cardiology",
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      department: "Neurology",
      status: "Busy",
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      department: "Orthopedics",
      status: "Available",
    },
    {
      id: 4,
      name: "Dr. Sneha Rao",
      department: "Pediatrics",
      status: "On Leave",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return {
          container: "bg-green-100 text-green-700",
          dot: "bg-green-500",
        };

      case "busy":
        return {
          container: "bg-yellow-100 text-yellow-700",
          dot: "bg-yellow-500",
        };

      case "on leave":
        return {
          container: "bg-red-100 text-red-700",
          dot: "bg-red-500",
        };

      default:
        return {
          container: "bg-gray-100 text-gray-700",
          dot: "bg-gray-500",
        };
    }
  };

  const availableCount = doctorData.filter(
    (doctor) => doctor.status.toLowerCase() === "available"
  ).length;

  const busyCount = doctorData.filter(
    (doctor) => doctor.status.toLowerCase() === "busy"
  ).length;

  const leaveCount = doctorData.filter(
    (doctor) => doctor.status.toLowerCase() === "on leave"
  ).length;

  return (
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Doctor Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current availability of doctors
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">
            {doctorData.length}
          </p>

          <p className="text-xs text-gray-500">
            Doctors
          </p>
        </div>
      </div>

      {/* Doctor List */}
      <div className="space-y-3">
        {doctorData.length > 0 ? (
          doctorData.map((doctor) => {
            const statusStyle = getStatusStyle(doctor.status);

            return (
              <div
                key={doctor.id}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
              >
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {doctor.name
                    .replace("Dr. ", "")
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </div>

                {/* Doctor Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-800">
                    {doctor.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {doctor.department}
                  </p>
                </div>

                {/* Status */}
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle.container}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                  ></span>

                  {doctor.status}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-sm text-gray-500">
              No doctors available.
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-200 pt-4">
        {/* Available */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

          <span className="text-xs text-gray-600">
            Available
          </span>

          <span className="text-sm font-bold text-gray-800">
            {availableCount}
          </span>
        </div>

        {/* Busy */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>

          <span className="text-xs text-gray-600">
            Busy
          </span>

          <span className="text-sm font-bold text-gray-800">
            {busyCount}
          </span>
        </div>

        {/* On Leave */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>

          <span className="text-xs text-gray-600">
            On Leave
          </span>

          <span className="text-sm font-bold text-gray-800">
            {leaveCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorStatus;

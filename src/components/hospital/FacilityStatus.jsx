import React from "react";

const FacilityStatus = ({ facilities }) => {
  const facilityData = facilities || [
    {
      id: 1,
      name: "ICU",
      description: "Intensive Care Unit",
      status: "Available",
      capacity: "8 / 12",
    },
    {
      id: 2,
      name: "Operation Theatre",
      description: "Surgical facility",
      status: "Available",
      capacity: "3 / 4",
    },
    {
      id: 3,
      name: "Emergency",
      description: "Emergency Department",
      status: "Busy",
      capacity: "18 / 20",
    },
    {
      id: 4,
      name: "MRI",
      description: "MRI Scan Facility",
      status: "Unavailable",
      capacity: "0 / 1",
    },
    {
      id: 5,
      name: "Laboratory",
      description: "Diagnostic Laboratory",
      status: "Available",
      capacity: "6 / 8",
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

      case "unavailable":
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

  const availableCount = facilityData.filter(
    (facility) =>
      facility.status.toLowerCase() === "available"
  ).length;

  const busyCount = facilityData.filter(
    (facility) =>
      facility.status.toLowerCase() === "busy"
  ).length;

  const unavailableCount = facilityData.filter(
    (facility) =>
      facility.status.toLowerCase() === "unavailable"
  ).length;

  return (
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Facility Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current status of hospital facilities
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">
            {facilityData.length}
          </p>

          <p className="text-xs text-gray-500">
            Facilities
          </p>
        </div>
      </div>

      {/* Facility List */}
      <div className="space-y-3">
        {facilityData.length > 0 ? (
          facilityData.map((facility) => {
            const statusStyle = getStatusStyle(
              facility.status
            );

            return (
              <div
                key={facility.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
              >
                {/* Facility Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xl">
                  🏥
                </div>

                {/* Facility Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {facility.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {facility.description}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Capacity: {facility.capacity}
                  </p>
                </div>

                {/* Status */}
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle.container}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                  ></span>

                  {facility.status}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-sm text-gray-500">
              No facilities available.
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

        {/* Unavailable */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>

          <span className="text-xs text-gray-600">
            Unavailable
          </span>

          <span className="text-sm font-bold text-gray-800">
            {unavailableCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FacilityStatus;

import React from "react";

const BedStatus = ({ beds }) => {
  const bedData = beds || {
    total: 100,
    available: 35,
    occupied: 55,
    reserved: 10,
  };

  const occupancyPercentage = Math.round(
    (bedData.occupied / bedData.total) * 100
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Bed Status
          </h2>
          <p className="text-sm text-gray-500">
            Current hospital bed availability
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">
            {bedData.total}
          </p>
          <p className="text-xs text-gray-500">Total Beds</p>
        </div>
      </div>

      {/* Occupancy Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Occupancy</span>
          <span className="font-medium text-gray-700">
            {occupancyPercentage}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              occupancyPercentage >= 90
                ? "bg-red-500"
                : occupancyPercentage >= 70
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${occupancyPercentage}%` }}
          />
        </div>
      </div>

      {/* Bed Statistics */}
      <div className="grid grid-cols-3 gap-4">
        {/* Available */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2" />

          <p className="text-2xl font-bold text-green-600">
            {bedData.available}
          </p>

          <p className="text-sm text-gray-600">
            Available
          </p>
        </div>

        {/* Occupied */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2" />

          <p className="text-2xl font-bold text-red-600">
            {bedData.occupied}
          </p>

          <p className="text-sm text-gray-600">
            Occupied
          </p>
        </div>

        {/* Reserved */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2" />

          <p className="text-2xl font-bold text-yellow-600">
            {bedData.reserved}
          </p>

          <p className="text-sm text-gray-600">
            Reserved
          </p>
        </div>
      </div>

      {/* Availability Message */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        {bedData.available > 0 ? (
          <p className="text-sm text-green-600 font-medium">
            ✓ {bedData.available} beds currently available
          </p>
        ) : (
          <p className="text-sm text-red-600 font-medium">
            ⚠ No beds currently available
          </p>
        )}
      </div>
    </div>
  );
};

export default BedStatus;

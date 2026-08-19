import React from "react";

import BedStatus from "../components/hospital/BedStatus";
import DoctorStatus from "../components/hospital/DoctorStatus";
import FacilityStatus from "../components/hospital/FacilityStatus";
import IncomingRequest from "../components/hospital/IncomingRequest";

const HospitalDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hospital Dashboard
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Monitor hospital resources and incoming requests
              </p>
            </div>

            {/* Hospital Status */}
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

              <span className="text-sm font-semibold text-green-700">
                Hospital Online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Bed Status */}
          <BedStatus />

          {/* Doctor Status */}
          <DoctorStatus />

          {/* Facility Status */}
          <FacilityStatus />

          {/* Incoming Requests */}
          <IncomingRequest />
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;

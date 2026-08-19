// src/components/ambulance/HospitalList.jsx

import React from "react";
import HospitalCard from "./HospitalCard";

const HospitalList = ({
  hospitals,
  onNavigate,
}) => {
  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <p className="text-gray-500">
          No hospitals available.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Recommended Hospitals
      </h2>

      <div className="grid gap-4">
        {hospitals.map(
          (hospital, index) => (
            <div
              key={hospital.id}
              className="relative"
            >
              {index === 0 && (
                <span className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  ⭐ Best Match
                </span>
              )}

              <HospitalCard
                hospital={hospital}
                onNavigate={onNavigate}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HospitalList;

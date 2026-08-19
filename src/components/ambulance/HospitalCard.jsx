// src/components/ambulance/HospitalCard.jsx

import React from "react";

const HospitalCard = ({
  hospital,
  onNavigate,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border">
      <h2 className="text-xl font-bold mb-3">
        🏥 {hospital.name}
      </h2>

      <div className="space-y-2">
        <p>
          📍 <strong>Distance:</strong>{" "}
          {hospital.distance} km
        </p>

        <p>
          🚑 <strong>ETA:</strong>{" "}
          {hospital.eta}
        </p>

        <p>
          🛏 <strong>ICU Beds:</strong>{" "}
          {hospital.icuAvailable
            ? "Available"
            : "Not Available"}
        </p>

        <p>
          🩺 <strong>Doctor:</strong>{" "}
          {hospital.doctorAvailable
            ? "Available"
            : "Not Available"}
        </p>

        <p>
          🏥 <strong>Emergency Beds:</strong>{" "}
          {hospital.emergencyBedsAvailable
            ? "Available"
            : "Not Available"}
        </p>

        <p className="font-bold text-green-600">
          ⭐ Match Score: {hospital.score}%
        </p>
      </div>

      <button
        onClick={() => onNavigate(hospital)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Navigate
      </button>
    </div>
  );
};

export default HospitalCard;

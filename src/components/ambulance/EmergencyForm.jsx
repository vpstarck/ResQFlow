// src/components/ambulance/EmergencyForm.jsx

import React, { useState } from "react";

const emergencyOptions = [
  {
    id: "HEART_ATTACK",
    label: "Heart Attack",
    color: "#ef4444",
    priority: "CRITICAL",
  },
  {
    id: "RESPIRATORY",
    label: "Respiratory Problem",
    color: "#f97316",
    priority: "HIGH",
  },
  {
    id: "STROKE",
    label: "Stroke",
    color: "#eab308",
    priority: "CRITICAL",
  },
  {
    id: "TRAUMA",
    label: "Accident / Trauma",
    color: "#3b82f6",
    priority: "HIGH",
  },
  {
    id: "NEUROLOGICAL",
    label: "Neurological Emergency",
    color: "#a855f7",
    priority: "HIGH",
  },
  {
    id: "OTHER",
    label: "Other",
    color: "#22c55e",
    priority: "MEDIUM",
  },
];

const EmergencyForm = ({ onSelectEmergency }) => {
  const [selectedEmergency, setSelectedEmergency] =
    useState(null);

  const handleSelect = (emergency) => {
    setSelectedEmergency(emergency);

    if (onSelectEmergency) {
      onSelectEmergency(emergency);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Select Emergency Type
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {emergencyOptions.map((emergency) => (
          <button
            key={emergency.id}
            onClick={() => handleSelect(emergency)}
            className="text-white font-semibold py-4 px-4 rounded-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: emergency.color,
            }}
          >
            {emergency.label}
          </button>
        ))}
      </div>

      {selectedEmergency && (
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="font-bold text-lg">
            Selected Emergency
          </h3>

          <p>
            <strong>Type:</strong>{" "}
            {selectedEmergency.label}
          </p>

          <p>
            <strong>Priority:</strong>{" "}
            {selectedEmergency.priority}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencyForm;

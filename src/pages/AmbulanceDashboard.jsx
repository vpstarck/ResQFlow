// src/pages/AmbulanceDashboard.jsx

import React, { useState } from "react";

import EmergencyForm from "../components/ambulance/EmergencyForm";
import HospitalList from "../components/ambulance/HospitalList";

import { createEmergency } from "../services/emergencyService";
import { getCurrentUser } from "../services/authService";

const AmbulanceDashboard = () => {
  const [selectedEmergency, setSelectedEmergency] =
    useState(null);

  const [recommendedHospitals, setRecommendedHospitals] =
    useState([]);

  const handleEmergencySelect = async (
    emergency
  ) => {
    try {
      setSelectedEmergency(emergency);

      const currentUser =
        getCurrentUser();

      if (currentUser) {
        await createEmergency(
          currentUser.uid,
          emergency.id,
          emergency.priority
        );
      }

      // Temporary hospital data
      // Replace later with hospital matching logic

      const hospitals = [
        {
          id: "H001",
          name: "City Hospital",
          distance: 4.2,
          eta: "8 min",

          icuAvailable: true,
          doctorAvailable: true,
          emergencyBedsAvailable: true,

          score: 95,

          latitude: 11.0168,
          longitude: 76.9558,
        },

        {
          id: "H002",
          name: "Apollo Hospital",
          distance: 6.5,
          eta: "11 min",

          icuAvailable: true,
          doctorAvailable: true,
          emergencyBedsAvailable: true,

          score: 88,

          latitude: 11.025,
          longitude: 76.97,
        },

        {
          id: "H003",
          name: "Government Hospital",
          distance: 8.1,
          eta: "15 min",

          icuAvailable: false,
          doctorAvailable: true,
          emergencyBedsAvailable: true,

          score: 75,

          latitude: 11.03,
          longitude: 76.99,
        },
      ];

      setRecommendedHospitals(hospitals);
    } catch (error) {
      console.error(error);
      alert("Failed to create emergency");
    }
  };

  const handleNavigate = (hospital) => {
    const mapsUrl =
      `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;

    window.open(
      mapsUrl,
      "_blank"
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        🚑 Ambulance Dashboard
      </h1>

      <EmergencyForm
        onSelectEmergency={
          handleEmergencySelect
        }
      />

      {selectedEmergency && (
        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <h2 className="font-bold text-lg">
            Current Emergency
          </h2>

          <p>
            Type:{" "}
            {selectedEmergency.label}
          </p>

          <p>
            Priority:{" "}
            {selectedEmergency.priority}
          </p>
        </div>
      )}

      <HospitalList
        hospitals={
          recommendedHospitals
        }
        onNavigate={
          handleNavigate
        }
      />
    </div>
  );
};

export default AmbulanceDashboard;

// src/services/ambulanceService.js

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

/**
 * Get ambulance details by document ID
 */
export const getAmbulanceById = async (ambulanceId) => {
  try {
    const ambulanceRef = doc(db, "ambulances", ambulanceId);

    const ambulanceSnap = await getDoc(ambulanceRef);

    if (!ambulanceSnap.exists()) {
      throw new Error("Ambulance not found");
    }

    return {
      id: ambulanceSnap.id,
      ...ambulanceSnap.data(),
    };
  } catch (error) {
    console.error("Error fetching ambulance:", error);

    throw error;
  }
};

/**
 * Update ambulance status
 */
export const updateAmbulanceStatus = async (
  ambulanceId,
  status
) => {
  try {
    const ambulanceRef = doc(
      db,
      "ambulances",
      ambulanceId
    );

    await updateDoc(ambulanceRef, {
      status,
      updatedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error("Error updating status:", error);

    throw error;
  }
};

/**
 * Set ambulance available
 */
export const setAmbulanceAvailable = async (
  ambulanceId
) => {
  return updateAmbulanceStatus(
    ambulanceId,
    "AVAILABLE"
  );
};

/**
 * Set ambulance busy
 */
export const setAmbulanceBusy = async (
  ambulanceId
) => {
  return updateAmbulanceStatus(
    ambulanceId,
    "BUSY"
  );
};

/**
 * Update ambulance location
 */
export const updateAmbulanceLocation = async (
  ambulanceId,
  latitude,
  longitude
) => {
  try {
    const ambulanceRef = doc(
      db,
      "ambulances",
      ambulanceId
    );

    await updateDoc(ambulanceRef, {
      location: {
        latitude,
        longitude,
      },
      updatedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error(
      "Error updating location:",
      error
    );

    throw error;
  }
};

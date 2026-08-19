// src/services/emergencyService.js

import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase";

/**
 * Create a new emergency
 */
export const createEmergency = async (
  ambulanceId,
  emergencyType,
  priority
) => {
  try {
    const emergencyRef = await addDoc(
      collection(db, "emergencies"),
      {
        ambulanceId,
        emergencyType,
        priority,
        status: "ACTIVE",

        selectedHospital: null,
        eta: null,

        createdAt: serverTimestamp(),
      }
    );

    return emergencyRef.id;
  } catch (error) {
    console.error(
      "Error creating emergency:",
      error
    );

    throw error;
  }
};

/**
 * Get emergency by ID
 */
export const getEmergencyById = async (
  emergencyId
) => {
  try {
    const emergencyRef = doc(
      db,
      "emergencies",
      emergencyId
    );

    const emergencySnap =
      await getDoc(emergencyRef);

    if (!emergencySnap.exists()) {
      throw new Error(
        "Emergency not found"
      );
    }

    return {
      id: emergencySnap.id,
      ...emergencySnap.data(),
    };
  } catch (error) {
    console.error(
      "Error fetching emergency:",
      error
    );

    throw error;
  }
};

/**
 * Update emergency status
 */
export const updateEmergencyStatus =
  async (emergencyId, status) => {
    try {
      const emergencyRef = doc(
        db,
        "emergencies",
        emergencyId
      );

      await updateDoc(
        emergencyRef,
        {
          status,
        }
      );

      return true;
    } catch (error) {
      console.error(
        "Error updating status:",
        error
      );

      throw error;
    }
  };

/**
 * Assign hospital to emergency
 */
export const assignHospital =
  async (
    emergencyId,
    hospitalId,
    eta
  ) => {
    try {
      const emergencyRef = doc(
        db,
        "emergencies",
        emergencyId
      );

      await updateDoc(
        emergencyRef,
        {
          selectedHospital:
            hospitalId,
          eta,
          status: "ASSIGNED",
        }
      );

      return true;
    } catch (error) {
      console.error(
        "Error assigning hospital:",
        error
      );

      throw error;
    }
  };

/**
 * Close emergency
 */
export const closeEmergency =
  async (emergencyId) => {
    try {
      const emergencyRef = doc(
        db,
        "emergencies",
        emergencyId
      );

      await updateDoc(
        emergencyRef,
        {
          status: "COMPLETED",
        }
      );

      return true;
    } catch (error) {
      console.error(
        "Error closing emergency:",
        error
      );

      throw error;
    }
  };

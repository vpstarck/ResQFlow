// src/services/hospitalService.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

/*
  Firestore structure used by this service:

  hospitals/{hospitalId}
  {
    name: "City Hospital",
    location: {
      latitude: 13.0827,
      longitude: 80.2707
    },

    beds: {
      icu: {
        available: 3,
        total: 10
      },
      emergency: {
        available: 6,
        total: 15
      }
    },

    ventilators: {
      available: 4,
      total: 10
    },

    facilities: {
      trauma: true,
      ctScan: true,
      surgery: true
    },

    doctors: {
      neurosurgeon: true,
      cardiologist: false,
      traumaSurgeon: true
    },

    updatedAt: Timestamp
  }

  emergencyRequests/{requestId}
  {
    ambulanceId: "A102",
    hospitalId: "hospital123",
    patientCondition: "Critical Trauma",
    eta: 7,
    status: "pending",
    createdAt: Timestamp
  }
*/


// ============================================================
// HOSPITAL INFORMATION
// ============================================================

/**
 * Get a single hospital by its ID.
 */
export const getHospitalById = async (hospitalId) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);
    const hospitalSnapshot = await getDoc(hospitalRef);

    if (!hospitalSnapshot.exists()) {
      throw new Error("Hospital not found.");
    }

    return {
      id: hospitalSnapshot.id,
      ...hospitalSnapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching hospital:", error);
    throw error;
  }
};


/**
 * Get all hospitals.
 *
 * This will also be useful for ambulance-side
 * hospital matching.
 */
export const getAllHospitals = async () => {
  try {
    const hospitalsRef = collection(db, "hospitals");
    const snapshot = await getDocs(hospitalsRef);

    return snapshot.docs.map((hospital) => ({
      id: hospital.id,
      ...hospital.data(),
    }));
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
};


// ============================================================
// BED MANAGEMENT
// ============================================================

/**
 * Update ICU bed availability.
 *
 * Example:
 * updateICUBeds("hospital123", 4)
 */
export const updateICUBeds = async (hospitalId, available) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    if (available < 0) {
      throw new Error("Available beds cannot be negative.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);

    await updateDoc(hospitalRef, {
      "beds.icu.available": available,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating ICU beds:", error);
    throw error;
  }
};


/**
 * Update emergency bed availability.
 */
export const updateEmergencyBeds = async (hospitalId, available) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    if (available < 0) {
      throw new Error("Available beds cannot be negative.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);

    await updateDoc(hospitalRef, {
      "beds.emergency.available": available,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating emergency beds:", error);
    throw error;
  }
};


/**
 * Update both ICU and emergency beds at once.
 */
export const updateBedAvailability = async (
  hospitalId,
  icuAvailable,
  emergencyAvailable
) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    if (icuAvailable < 0 || emergencyAvailable < 0) {
      throw new Error("Bed availability cannot be negative.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);

    await updateDoc(hospitalRef, {
      "beds.icu.available": icuAvailable,
      "beds.emergency.available": emergencyAvailable,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating bed availability:", error);
    throw error;
  }
};


// ============================================================
// VENTILATOR MANAGEMENT
// ============================================================

/**
 * Update ventilator availability.
 */
export const updateVentilatorAvailability = async (
  hospitalId,
  available
) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    if (available < 0) {
      throw new Error("Available ventilators cannot be negative.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);

    await updateDoc(hospitalRef, {
      "ventilators.available": available,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating ventilators:", error);
    throw error;
  }
};


// ============================================================
// DOCTOR AVAILABILITY
// ============================================================

/**
 * Update availability of a specific doctor/specialist.
 *
 * Example:
 * updateDoctorAvailability(
 *   "hospital123",
 *   "neurosurgeon",
 *   true
 * );
 */
export const updateDoctorAvailability = async (
  hospitalId,
  doctorType,
  available
) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    if (!doctorType) {
      throw new Error("Doctor type is required.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);

    await updateDoc(hospitalRef, {
      [`doctors.${doctorType}`]: available,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating doctor availability:", error);
    throw error;
  }
};


// ============================================================
// FACILITY MANAGEMENT
// ============================================================

/**
 * Update availability of a hospital facility.
 *
 * Example:
 *
 * updateFacilityAvailability(
 *   "hospital123",
 *   "ctScan",
 *   true
 * );
 */
export const updateFacilityAvailability = async (
  hospitalId,
  facility,
  available
) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    if (!facility) {
      throw new Error("Facility name is required.");
    }

    const hospitalRef = doc(db, "hospitals", hospitalId);

    await updateDoc(hospitalRef, {
      [`facilities.${facility}`]: available,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating facility availability:", error);
    throw error;
  }
};


// ============================================================
// INCOMING AMBULANCE REQUESTS
// ============================================================

/**
 * Get pending ambulance requests for a particular hospital.
 */
export const getIncomingRequests = async (hospitalId) => {
  try {
    if (!hospitalId) {
      throw new Error("Hospital ID is required.");
    }

    const requestsRef = collection(db, "emergencyRequests");

    const requestsQuery = query(
      requestsRef,
      where("hospitalId", "==", hospitalId),
      where("status", "==", "pending")
    );

    const snapshot = await getDocs(requestsQuery);

    return snapshot.docs.map((request) => ({
      id: request.id,
      ...request.data(),
    }));
  } catch (error) {
    console.error("Error fetching incoming requests:", error);
    throw error;
  }
};


/**
 * Accept an incoming ambulance request.
 */
export const acceptAmbulanceRequest = async (requestId) => {
  try {
    if (!requestId) {
      throw new Error("Request ID is required.");
    }

    const requestRef = doc(
      db,
      "emergencyRequests",
      requestId
    );

    await updateDoc(requestRef, {
      status: "accepted",
      respondedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error accepting ambulance request:", error);
    throw error;
  }
};


/**
 * Reject an incoming ambulance request.
 */
export const rejectAmbulanceRequest = async (requestId) => {
  try {
    if (!requestId) {
      throw new Error("Request ID is required.");
    }

    const requestRef = doc(
      db,
      "emergencyRequests",
      requestId
    );

    await updateDoc(requestRef, {
      status: "rejected",
      respondedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error rejecting ambulance request:", error);
    throw error;
  }
};


// ============================================================
// REAL-TIME HOSPITAL LISTENER
// ============================================================

/**
 * Listen for real-time changes to a particular hospital.
 *
 * Usage:
 *
 * const unsubscribe = subscribeToHospital(
 *   hospitalId,
 *   (hospital) => {
 *     console.log(hospital);
 *   }
 * );
 *
 * When finished:
 *
 * unsubscribe();
 */
export const subscribeToHospital = (hospitalId, callback) => {
  if (!hospitalId) {
    throw new Error("Hospital ID is required.");
  }

  const hospitalRef = doc(db, "hospitals", hospitalId);

  return onSnapshot(
    hospitalRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({
          id: snapshot.id,
          ...snapshot.data(),
        });
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error("Hospital listener error:", error);
    }
  );
};


// ============================================================
// REAL-TIME INCOMING REQUEST LISTENER
// ============================================================

/**
 * Listen for incoming ambulance requests in real time.
 *
 * This is particularly useful for IncomingRequest.jsx.
 */
export const subscribeToIncomingRequests = (
  hospitalId,
  callback
) => {
  if (!hospitalId) {
    throw new Error("Hospital ID is required.");
  }

  const requestsRef = collection(db, "emergencyRequests");

  const requestsQuery = query(
    requestsRef,
    where("hospitalId", "==", hospitalId),
    where("status", "==", "pending")
  );

  return onSnapshot(
    requestsQuery,
    (snapshot) => {
      const requests = snapshot.docs.map((request) => ({
        id: request.id,
        ...request.data(),
      }));

      callback(requests);
    },
    (error) => {
      console.error(
        "Incoming request listener error:",
        error
      );
    }
  );
};

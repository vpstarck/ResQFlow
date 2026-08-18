export function calculateScore(hospital, patient = {}) {
  if (!hospital) {
    return {
      score: 0,
      breakdown: {},
      reasons: [],
    };
  }

  const distanceScore = calculateDistanceScore(
    hospital.distanceKm
  );

  const bedScore = calculateBedScore(
    hospital,
    patient
  );

  const doctorScore = calculateDoctorScore(
    hospital,
    patient
  );

  const facilityScore = calculateFacilityScore(
    hospital,
    patient
  );

  const emergencyScore = calculateEmergencyScore(
    hospital
  );

  const score =
    distanceScore * 0.3 +
    bedScore * 0.25 +
    doctorScore * 0.2 +
    facilityScore * 0.15 +
    emergencyScore * 0.1;

  const reasons = [];

  if (distanceScore >= 80) {
    reasons.push("Close to ambulance");
  }

  if (bedScore >= 80) {
    reasons.push("Beds available");
  }

  if (doctorScore >= 80) {
    reasons.push("Required doctor available");
  }

  if (facilityScore >= 80) {
    reasons.push("Required facilities available");
  }

  if (emergencyScore >= 80) {
    reasons.push("Emergency capacity available");
  }

  return {
    score: Math.round(score),
    breakdown: {
      distance: Math.round(distanceScore),
      beds: Math.round(bedScore),
      doctors: Math.round(doctorScore),
      facilities: Math.round(facilityScore),
      emergency: Math.round(emergencyScore),
    },
    reasons,
  };
}

function calculateDistanceScore(distanceKm) {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    return 0;
  }

  return clamp(
    100 - distanceKm * 10,
    0,
    100
  );
}

function calculateBedScore(hospital, patient) {
  const severity = patient.severity || "moderate";

  let availableBeds =
    hospital.availableBeds ?? 0;

  if (severity === "critical") {
    availableBeds =
      hospital.icuBedsAvailable ??
      hospital.availableICUBeds ??
      0;
  }

  if (severity === "serious") {
    availableBeds =
      hospital.emergencyBedsAvailable ??
      hospital.availableEmergencyBeds ??
      availableBeds;
  }

  if (availableBeds <= 0) {
    return 0;
  }

  if (availableBeds >= 5) {
    return 100;
  }

  return availableBeds * 20;
}

function calculateDoctorScore(hospital, patient) {
  const requiredDoctor =
    patient.requiredDoctor ||
    patient.specialist ||
    null;

  const doctors = hospital.doctors || {};

  if (!requiredDoctor) {
    return hospital.doctorAvailable === false
      ? 30
      : 100;
  }

  const status =
    doctors[requiredDoctor] ??
    hospital.doctorAvailability?.[
      requiredDoctor
    ];

  if (
    status === true ||
    status === "available"
  ) {
    return 100;
  }

  if (status === "on-call") {
    return 70;
  }

  return 0;
}

function calculateFacilityScore(hospital, patient) {
  const requiredFacilities =
    patient.requiredFacilities || [];

  if (requiredFacilities.length === 0) {
    return 100;
  }

  const facilities =
    hospital.facilities || {};

  const available =
    requiredFacilities.filter((facility) => {
      const status = facilities[facility];

      return (
        status === true ||
        status === "available"
      );
    }).length;

  return (
    available /
    requiredFacilities.length
  ) * 100;
}

function calculateEmergencyScore(hospital) {
  if (hospital.emergencyAvailable === false) {
    return 0;
  }

  if (
    hospital.traumaUnit === true ||
    hospital.traumaUnit === "available"
  ) {
    return 100;
  }

  if (hospital.emergencyDepartment === true) {
    return 90;
  }

  return 70;
}

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

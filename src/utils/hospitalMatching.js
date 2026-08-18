import { calculateScore } from "./calculateScore";
import { calculateETA } from "./calculateETA";

export function matchHospitals(
  hospitals = [],
  patient = {},
  ambulanceLocation = null
) {
  if (!Array.isArray(hospitals)) {
    return [];
  }

  return hospitals
    .filter((hospital) => hospital && hospital.isActive !== false)
    .map((hospital) => {
      const distanceKm = calculateDistance(
        ambulanceLocation,
        hospital.location
      );

      const hospitalData = {
        ...hospital,
        distanceKm,
      };

      const scoreResult = calculateScore(
        hospitalData,
        patient
      );

      const eta = calculateETA(distanceKm);

      return {
        ...hospitalData,
        eta,
        score: scoreResult.score,
        scoreBreakdown: scoreResult.breakdown,
        matchReasons: scoreResult.reasons,
        matchStatus: getMatchStatus(scoreResult.score),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getEligibleHospitals(
  hospitals = [],
  patient = {},
  ambulanceLocation = null
) {
  return matchHospitals(
    hospitals,
    patient,
    ambulanceLocation
  ).filter((hospital) => hospital.score >= 50);
}

export function getBestHospital(
  hospitals = [],
  patient = {},
  ambulanceLocation = null
) {
  const hospitalsList = getEligibleHospitals(
    hospitals,
    patient,
    ambulanceLocation
  );

  return hospitalsList.length > 0
    ? hospitalsList[0]
    : null;
}

function getMatchStatus(score) {
  if (score >= 80) {
    return "EXCELLENT";
  }

  if (score >= 65) {
    return "GOOD";
  }

  if (score >= 50) {
    return "LIMITED";
  }

  return "UNAVAILABLE";
}

function calculateDistance(point1, point2) {
  if (!point1 || !point2) {
    return 0;
  }

  const lat1 = Number(point1.latitude ?? point1.lat);
  const lon1 = Number(
    point1.longitude ?? point1.lng ?? point1.lon
  );

  const lat2 = Number(point2.latitude ?? point2.lat);
  const lon2 = Number(
    point2.longitude ?? point2.lng ?? point2.lon
  );

  if (
    !Number.isFinite(lat1) ||
    !Number.isFinite(lon1) ||
    !Number.isFinite(lat2) ||
    !Number.isFinite(lon2)
  ) {
    return 0;
  }

  const earthRadiusKm = 6371;

  const latDifference = toRadians(lat2 - lat1);
  const lonDifference = toRadians(lon2 - lon1);

  const a =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(lonDifference / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return Number(
    (earthRadiusKm * c).toFixed(2)
  );
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

import { calculateDistance } from "./calculateDistance";
import { calculateScore } from "./calculateScore";

export function matchHospitals(
  hospitals,
  ambulanceLocation,
  emergencyType
) {
  return hospitals
    .map((hospital) => {
      const distance = calculateDistance(
        ambulanceLocation.latitude,
        ambulanceLocation.longitude,
        hospital.location.latitude,
        hospital.location.longitude
      );

      const score = calculateScore(
        hospital,
        distance,
        emergencyType
      );

      return {
        ...hospital,
        distance: Number(distance.toFixed(2)),
        score,
        eta: Math.ceil(distance * 3),
      };
    })
    .sort((a, b) => b.score - a.score);
}

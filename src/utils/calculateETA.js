export function calculateETA(
  distanceKm,
  speedKmh = 40
) {
  if (
    !Number.isFinite(distanceKm) ||
    distanceKm < 0
  ) {
    return null;
  }

  if (
    !Number.isFinite(speedKmh) ||
    speedKmh <= 0
  ) {
    return null;
  }

  const timeHours =
    distanceKm / speedKmh;

  const timeMinutes =
    timeHours * 60;

  return Math.ceil(timeMinutes);
}

export function formatETA(minutes) {
  if (!Number.isFinite(minutes)) {
    return "ETA unavailable";
  }

  if (minutes < 1) {
    return "Less than 1 min";
  }

  return `${minutes} min`;
}

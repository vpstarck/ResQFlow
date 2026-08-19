export function calculateScore(hospital, distance, emergencyType) {
  let score = 0;

  if (distance <= 2) score += 30;
  else if (distance <= 5) score += 25;
  else if (distance <= 10) score += 15;
  else score += 5;

  if (hospital.beds?.emergency > 0) score += 20;
  if (hospital.beds?.icu > 0) score += 15;

  if (hospital.doctors?.[emergencyType] === true) {
    score += 20;
  }

  if (hospital.facilities?.[emergencyType] === true) {
    score += 15;
  }

  return score;
}

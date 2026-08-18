export const PRIORITIES = {
  CRITICAL: {
    value: "critical",
    label: "Critical",
    color: "red",
    score: 4,
  },

  HIGH: {
    value: "high",
    label: "High",
    color: "orange",
    score: 3,
  },

  MEDIUM: {
    value: "medium",
    label: "Medium",
    color: "yellow",
    score: 2,
  },

  LOW: {
    value: "low",
    label: "Low",
    color: "green",
    score: 1,
  },
};

export const PRIORITY_OPTIONS = Object.values(PRIORITIES);

export const USER_ROLES = {
  AMBULANCE: "ambulance",
  HOSPITAL: "hospital",
};

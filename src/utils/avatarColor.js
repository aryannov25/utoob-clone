const COLORS = [
  "#1e40af",
  "#7e22ce",
  "#065f46",
  "#9f1239",
  "#92400e",
  "#0e7490",
  "#3f6212",
  "#4c1d95",
];

export const avatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

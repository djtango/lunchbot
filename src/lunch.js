const LUNCH_FIELDS = [
  "lunch",
  ":taco:",
  ":pizza:",
  ":hamburger:",
  ":ramen:",
  ":hotdog:",
  ":sandwich:",
  ":spaghetti:"
];

const isLunch = (statusString) => {
  const s = statusString.toLowerCase();
  const pred = (lunchField) => s === lunchField;
  return LUNCH_FIELDS.some(pred);
};

module.exports = { isLunch };

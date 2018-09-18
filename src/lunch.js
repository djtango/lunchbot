const slack = require('./slack.js');


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

const itsLunchTime = (body) => {
  console.log(slack.getDisplayName(body) + ' is on lunch');
  slack.getUserList((r) => console.log(r));
};

module.exports = { isLunch, itsLunchTime };

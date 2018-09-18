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

const isTakingLunchRightNow = (profile) => {
  const { status_text, status_emoji } = profile;
  return ( isLunch(status_text) || isLunch(status_emoji));
}

const findPeopleAlsoOnLunch = (userList) => {
  return slack
    .getPeopleProfiles(userList)
    .filter(isTakingLunchRightNow)
    .map((p) => p.display_name);
};

const itsLunchTime = (body) => {
  console.log(slack.getDisplayName(body) + ' is on lunch');
  slack.getUserList((r) => {
    const result = findPeopleAlsoOnLunch(r);
    console.log('people also on lunch right now:', result);
  });
};

module.exports = {
  isLunch,
  itsLunchTime,
  isTakingLunchRightNow,
};

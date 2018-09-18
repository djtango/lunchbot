const https = require('./https.js');

const SLACK_TOKEN = process.env.SLACK_TOKEN || "a_slack_token"

const getUserList = (next) => {
  const SLACK_API = "https://slack.com/api/users.list"
  const SLACK_URL = `${SLACK_API}?token=${SLACK_TOKEN}`
  return https.get(SLACK_URL, (res) => {
    next(res);
  });
};

const getPeopleProfiles = (resp) => {
  return resp
    .members
    .filter((m) => !m.is_bot && !m.deleted)
    .map(m => m.profile);
};

const getProfile = (body) => body.body.event.user.profile;
const getStatusText = (body) => getProfile(body).status_text;
const getStatusEmoji = (body) => getProfile(body).status_emoji;
const getDisplayName = (body) => getProfile(body).display_name;

module.exports = {
  getProfile,
  getStatusText,
  getStatusEmoji,
  getDisplayName,
  getUserList,
  getPeopleProfiles,
};

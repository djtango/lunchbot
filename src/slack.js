const getProfile = (body) => body.body.event.user.profile;
const getStatusText = (body) => getProfile(body).status_text;
const getStatusEmoji = (body) => getProfile(body).status_emoji;
const getDisplayName = (body) => getProfile(body).display_name;

module.exports = { getProfile, getStatusText, getStatusEmoji, getDisplayName };

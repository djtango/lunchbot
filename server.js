const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4123;

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

const logRoutesMiddleware = (req, res, next) => {
  const msg = JSON.stringify({
    method: req.method,
    route: req.path,
    body: req.body,
  });
  console.log(msg);
  return next();
};

app.use(bodyParser.json());
app.use(logRoutesMiddleware);

app.get('/', function(req, res) {
  res.send({"message": "hello"});
});

const getProfile = (body) => body.body.event.user.profile;
const getStatusText = (body) => getProfile(body).status_text;
const getStatusEmoji = (body) => getProfile(body).status_emoji;
const getDisplayName = (body) => getProfile(body).display_name;

const isLunch = (statusString) => {
  const s = statusString.toLowerCase();
  const pred = (lunchField) => s === lunchField;
  return LUNCH_FIELDS.some(pred);
};

app.post('/slack/events', function (req, res) {
  const { body } = req;
  const { challenge } = body;
  const statusText = getStatusText(body);
  const statusEmoji = getStatusEmoji(body);

  if (isLunch(statusText) || isLunch(statusEmoji)) {
    console.log(getDisplayName(body) + ' is on lunch');
  }
  res.send(challenge);
});

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${PORT}/`);
});

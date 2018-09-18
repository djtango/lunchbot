const express = require('express');
const bodyParser = require('body-parser');

const slack = require('./src/slack.js');
const lunch = require('./src/lunch.js');

const app = express();
const PORT = process.env.PORT || 4123;

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


app.post('/slack/events', function (req, res) {
  const { body } = req;
  const { challenge } = body;
  const statusText = slack.getStatusText(body);
  const statusEmoji = slack.getStatusEmoji(body);

  if (lunch.isLunch(statusText) ||
      lunch.isLunch(statusEmoji)) {
    console.log(slack.getDisplayName(body) + ' is on lunch');
  }
  res.send(challenge);
});

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${PORT}/`);
});

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4123

const logRoutesMiddleware = (req, res, next) => {
  const msg = JSON.stringify({
    method: req.method,
    route: req.path,
  });
  console.log(msg);
  return next();
}

app.use(express.static(path.join(__dirname, 'build')));
app.use(logRoutesMiddleware);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${PORT}/`);
});

const https = require('https');
const url = require('url');

const get = (urlOrOpts, next) => {
  https.get(urlOrOpts, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        next(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }
  ).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

const post = (urlString, postData, next) => {
  payload = JSON.stringify(postData || {});
  const urlObj = url.parse(urlString);
  const { hostname, pathname } = urlObj;
  const httpsOpts = {
    method: 'POST',
    path: pathname,
    hostname,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
      'Authorization': `Bearer ${postData.token}`,
    },
  };
  let req = https.request(httpsOpts,  (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        next(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.write(payload);
  req.end();
  return req;
};

module.exports = { get, post };

const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

const privateKey = fs.readFileSync('./private-key.pem', 'utf8');
const certificate = fs.readFileSync('./certificate.pem', 'utf8');
const ca = fs.readFileSync('./ca.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

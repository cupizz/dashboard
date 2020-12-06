const express = require('express');
const path = require('path');
const createProxyMiddleware = require('http-proxy-middleware');
const compression = require('compression');

const envPath = path.join(process.cwd(), './.env');
require('dotenv').config({ path: envPath });

const { PORT } = process.env;

const app = express();

app.disable('x-powered-by');
app.use(compression());
console.log(createProxyMiddleware);

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/healthz/readiness', (req, res) => {
  res.status(200).end('Ok');
});

app.use('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((error, req, res) => {
  res.status(500);
  res.render('error', { error });
});

const port = PORT || 8000;
app.listen(port, () => {
  console.info(`Listened at http://localhost:${port}`);
});

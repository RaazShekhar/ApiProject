const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
require('dotenv').config();
const dbConnector = require('./dbConnector');
const agency = require('./routes/agency');
const clients = require('./routes/clients');
const token = require('./routes/token');
const authentication = require('./middlewares/authentication');
const { PORT } = process.env;

app.use(bodyParser.json({ limit: '50mb' }));
// app.use((req, res, next) => {
//   //console.log('req: ', req);
//   next();
// })
app.use('/api/v1/agency', authentication, agency);
app.use('/api/v1/client', authentication, clients);
app.use('/api/v1/token', token);

server.listen(PORT, () => console.log(`listening on ${PORT}`))
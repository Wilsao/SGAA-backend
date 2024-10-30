const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);


module.exports = app;
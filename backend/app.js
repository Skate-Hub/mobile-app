// app.js
const express = require('express');
const app = express();
const obstaculoRoutes = require('./src/routes/obstaculosRoute');
const manobrasRoutes = require('./src/routes/manobrasRoutes')
const DBconnect = require("./src/database/database");

DBconnect();
app.use(express.json());
app.use('/obstaculos', obstaculoRoutes);
app.use('/manobras', manobrasRoutes);

module.exports = app;

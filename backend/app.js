// app.js
const express = require('express');
const app = express();
const obstaculoRoutes = require('./src/routes/obstaculosRoute');
const manobrasRoutes = require('./src/routes/manobrasRoutes');
const anexosRoutes = require('./src/routes/anexosRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require("./src/routes/userRoutes")
const DBconnect = require("./src/database/database");

DBconnect();
app.use(express.json());
app.use('/obstaculos', obstaculoRoutes);
app.use('/manobras', manobrasRoutes);
app.use('/anexos', anexosRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

module.exports = app;

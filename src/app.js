const express = require('express');
const novelsRouter = require('./routers/novelsRouter');

const app = express();

app.use(express.json());

app.use('/novels', novelsRouter);

module.exports = app;
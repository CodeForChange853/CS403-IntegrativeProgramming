const express = require('express');
const novelsRouter = require('./routers/novelsRouter');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());

app.use('/novels', novelsRouter);
app.use('/auth', authRouter);

module.exports = app;
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const app = express();
const {default : helmet} = require('helmet')
const morgan = require('morgan');
const mongodb =
//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//init db
require('../src/dbs/init.mongo')
//init routes
require('../src/routes/index')(app);
//init error handler

module.exports = app;
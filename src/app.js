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
//init db
require('../src/dbs/init.mongo')
//init routes
app.get('/',(req,res,next)=>{
    res.status(200).json({message: "Welcome to my app"})
})
//init error handler

module.exports = app;
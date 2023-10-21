require('dotenv').config({path : './.env'});
const express = require('express');
const app = express();

// DB CONNECTION 
require("./models/database.js").connectDatabase();

// bodyparser
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//SESSION AND COOKIE
const session = require("express-session");
const cookieparser = require("cookie-parser");

app.use(session(
    {
        resave : true,
        saveUninitialized : true,
        secret : process.env.EXPRESS_SESSION_SECRET
    }
))

app.use(cookieparser())

//logger
const logger = require('morgan');
app.use(logger('tiny'))

//Server
app.listen(process.env.PORT,
    console.log(`Server running on port : ${process.env.PORT}`)
);

// Routes
app.use('/',require('./routes/indexRoutes.js'))

// error handling
const ErorrHandler = require('./utils/ErrorHandler.js');
const { generatedErrors } = require('./middlewares/errors.js');

app.all('*',(req,res,next)=>{
    next(new ErorrHandler(`Requested URL Not Found : ${req.url}`,404))
})

app.use(generatedErrors)
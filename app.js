require('dotenv').config({path : './.env'});
const express = require('express');
const app = express();

const logger = require('morgan');
const ErorrHandler = require('./utils/ErrorHandler.js');
const { generatedErrors } = require('./middlewares/errors.js');
app.use(logger('tiny'))

app.listen(process.env.PORT,
    console.log(`Server running on port : ${process.env.PORT}`)
);

app.use('/',require('./routes/indexRoutes.js'))

app.all('*',(req,res,next)=>{
    next(new ErorrHandler(`Requested URL Not Found : ${req.url}`,404))
})

app.use(generatedErrors)
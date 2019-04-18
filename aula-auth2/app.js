const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');


const dbName = 'User';

mongoose.connect(`mongodb://localhost/${dbName}`, (err) => {
    err ? 
        console.log('Deu erro!')
    :
        console.log(`Conectamos no db: ${dbName}!`)
    
})



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default value for title local
app.locals.title = 'Express - Generated wih IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

const index = require('./routes/index');
app.use('/', index);


module.exports = app;

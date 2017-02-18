const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
// const favicon = require('serve-favicon');
const cors = require('cors');
const logger = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoURL = "mongodb://sunnyreciperundown:reciperundown@ds127429.mlab.com:27429/reciperundown";

//require routes
const routes = require('./routes/');
//const forms = require('./routes/forms');
// const recipepost = require('./routes/recipepost');
// const user = require('./routes/user');

//init express instance
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//connect flash
app.use(flash());

//connect to mongodb
mongoose.connect(mongoURL, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('Connected to mongodb!');
  }
});

//config passport
require('./config/passport.js');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//cors middleware 
app.use(cors());
//logger middleware
app.use(logger('dev'));
//bodyparser middlware
app.use(bodyParser.json( {limit: '200mb'} ));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 }));
//express-session middleware
app.use(session({
  secret: 'recipe rundown',
  resave: true,
  saveUninitialized: true
}));


//cookieparser middleware
app.use(cookieParser());

//init passport
app.use(passport.initialize());
app.use(passport.session());

//set static folder  serve static assets normally from this folder
app.use(express.static(path.join(__dirname, '../client/build'))); //was 'public'

//global vars
app.use( function(req, res, next){
  res.locals.user = req.user || null;
  next();
});
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

//routes
app.use('/api', routes);
//send file so react build file route appears on all url input 
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('/*', function(req, res){
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
//app.use('/forms', forms);
// app.use('/recipepost', recipepost);
// app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

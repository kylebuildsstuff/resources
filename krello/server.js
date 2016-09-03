var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var configDB = require('./config/database.js');
var port = process.env.PORT || 8000;

// Configuration
mongoose.connect(configDB.url);
require('./config/passport')(passport);

// view engine setup
app.set('view engine', 'ejs');

// Global middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));

// Passport
app.use(session({
  secret: 'secretKey',
  store: new mongoStore({ url: configDB.url })
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes.js')(app, passport); // loading routes and passing app and configured passport

app.listen(port);
console.log('The magic happens on port: ' + port);

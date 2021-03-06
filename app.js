var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');


var index = require('./routes/index');
var users = require('./routes/users');
var menu = require('./routes/menu');
var restaurant = require('./routes/restaurant');
var dataAdmin = require('./routes/dataAdmin');
var contact = require('./routes/contact');
var order = require('./routes/order');
var foodCategory = require('./routes/foodCategory');


// connect to mongodb
try {
    var mongoosePromise = mongoose.connect('mongodb://localhost/delivery3', {
        useMongoClient: true
    });
}
catch(err)
{
  console.log("DB connection error");
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/menu', menu);
app.use('/restaurant', restaurant);
app.use('/dataAdmin', dataAdmin);
app.use('/contact', contact);
app.use('/order', order);
app.use('/foodCategory', foodCategory);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

try{
    app.listen(1234, function () {
        console.log('app listening on port 1234');
    })}
catch(err)
{
    console.log("error:" +err);
}

module.exports = app;

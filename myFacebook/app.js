var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var producerRouter = require('./routes/producer');
var consumerRouter = require('./routes/consumer');
var adminAPIRouter = require('./routes/api/admin')
var producerAPIRouter = require('./routes/api/producer')
var consumerPIRouter = require('./routes/api/consumer')

var app = express();

//Base de Dados
mongoose.connect('mongodb://127.0.0.1:27017/myfacebook', {useNewUrlParser:true})
  .then(()=> console.log('Mongo ready: ' + mongoose.connection.readyState))
  .catch(()=> console.log('Erro de conexão.'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/producer', producerRouter)
app.use('/consumer', consumerRouter)
app.use('/api/admin', adminAPIRouter)
app.use('/api/producer', producerAPIRouter)
app.use('/api/consumer', consumerPIRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
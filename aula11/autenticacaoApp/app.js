var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var axios = require('axios')
var flash = require('connect-flash')

// Configuração da estratégia de autenticação
passport.use(new LocalStrategy(
  { usernameField: 'email'},
  (email, password, done) => {
    axios.get('http://localhost:5011/users?email=' + email)
      .then(dados => {
        const user = dados.data[0]
        if(!user) { return done(null, false, {message: 'Utilizador inexistente!'})}
        if(password != user.password) { return done(null, false, {message: 'Password inválida!'})}
        return done(null, user)
      })
      .catch(erro => done(erro))
  }
))

//Serialização do utilizador
passport.serializeUser((user, done) => {
  done(null, user.id)
})
// Funçaõ inversa
passport.deserializeUser((uid, done) => {
  axios.get('http://localhost:5011/users/' + uid)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro, false))
})


var app = express();

// Middleware da Sessão
app.use(session({
  genid: req => {
    console.log('Dentro do middleware da sessão: ' + req.sessionID)
    return uuid()
  },
  store: new FileStore(),
  secret: 'aula dweb 2018',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var comprasRouter = require('./routes/api/compras')

var axios = require('axios')
var uuid = require('uuid/v4')
var session = require('express-session')
var session_file_store = require('session-file-store')(session)
var passport = require('passport')
var localStrategy = require('passport-local').Strategy

passport.use(new localStrategy(
  {usernameField : "username"},
  (username,password,done) => {
    axios.get('http://localhost:4011/users/' + username)
      .then(dados => {
        const user = dados.data
        if(!user) {return done(null,false,{message: 'Utilizador inexistente!'})}
        console.log(password)
        console.log(user.password)
        if(password != user.password) {return done(null,false,{message: 'Password Inválida!'})}
        return done(null,user)
      })
      .catch(erro => {
        done(erro)
      })
  }
))

//Serialização do utilizador
passport.serializeUser((user,done) => {
  done(null,user.username)
})

//Desserialização do utilizador
passport.deserializeUser((username,done) => {
  axios.get('http://localhost:4011/api/users/' + username)
    .then(dados => {
      done(null,dados.data)
    })
    .catch(erro => done(erro,false))
})

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/comprasDB',{useNewUrlParser: true})
  .then(() => console.log('Console Ready: ' + mongoose.connection.readyState))
  .catch(erro => console.log('Erro de conexão!  ' + erro))

//Middleware da sessão
app.use(session({
  genid: req => {
    console.log("Dentro do middleware da sessão: " + req.sessionID)
    return uuid()
  },
  store: new session_file_store(),
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
app.use(cors({
  methods:['GET','POST'],
  credentials:true
}))

app.use('/', indexRouter);
app.use('/api/compras',comprasRouter)
app.use('/api/users', usersRouter);



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

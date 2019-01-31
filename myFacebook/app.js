var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var postsAPIRouter = require('./routes/api/posts')
var usersAPIRouter = require('./routes/api/users')

var UserController = require('./controllers/api/user')
var UserModel = require('./models/user')

var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy;
var axios = require('axios')
var flash = require('connect-flash')

//Base de Dados
mongoose.connect('mongodb://127.0.0.1:27017/myfacebook', {useNewUrlParser:true})
  .then(()=> console.log('Mongo ready: ' + mongoose.connection.readyState))
  .catch(()=> console.log('Erro de conexão.'))


var app = express();

// Middleware da Sessão
app.use(session({
  genid: req => {
    //console.log('Dentro do middleware da sessão: ' + req.sessionID)
    return uuid()
  },
  store: new FileStore(),
  secret: 'myFacebookApp',
  resave: false,
  saveUninitialized: true
}))

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Configuração da estratégia de autenticação
passport.use(new LocalStrategy(
  {usernameField: 'email'},
  function(email, password, done) {
    UserController.getUserByEmail(email, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      UserController.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
     	if(isMatch){
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: "333752157476906",
    clientSecret: "f2dd87846d33a6ef3350d313f35da3fc",
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    UserModel.findOne({ 'facebook.id' : profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) return done(null, user);
      else {
        // if there is no user found with that facebook id, create them
        var newUser = new UserModel();

        // set all of the facebook information in our user model
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name  = profile.displayName;
        if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
          newUser.facebook.email = profile.emails[0].value;

        // save our user to the database
        newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
        });
      }
    });
  }
));

//Serialização do utilizador
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Função Inversa
passport.deserializeUser(function(id, done) {
  UserController.getUserById(id, function(err, user) {
    done(err, user);
  });
});

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
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/api/posts', postsAPIRouter)
app.use('/api/users', usersAPIRouter)

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
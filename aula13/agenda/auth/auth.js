var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var UserModel = require('../models/user')

// Registo de um utilizador
passport.use('registo', new localStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	try{
		var user = await UserModel.create({email, password})
		return done(null, user)
	}
	catch(error){
		return done(error)
	}
}))

// Login de utilizadores
passport.use('login', new localStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	try{
		var user = await UserModel.findOne({email})
		if(!user)
			return done(null,false, {message: 'Utilizador não existe!'})
		var valid = await user.isValidPassword(password)
		if(!valid)
			return done(null,false, {message: 'Password inválida!'})
		return done(null, user, {message: 'Login feito com sucesso!'})
	}
	catch(error){
		return done(error)
	}
}))

// Autentição com JWT
var JWTStrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractFromSession = function(req){
	var token = null
	if(req && req.session)
		token=req.session.token
	return token
}

passport.use(new JWTStrategy({
	secretOrKey: 'dweb2018',
	jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession])
}, async (token, done) => {
	try{
		return done(null, token.user)
	}
	catch(error){
		return done(error)
	}
}))
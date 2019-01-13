var express = require('express')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var UserModel = require('../../models/user')

var router = express.Router()

// Devolve a lista de utilizadores
router.get('/', passport.authenticate('jwt', {session:false}), (req,res)=>{
	UserModel.find()
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).send('Erro na listagem dos utilizadores!'))
})

// Devolve a informação de um utlizador
router.get('/:uid', passport.authenticate('jwt', {session:false}), (req,res)=>{
	UserModel.findOne({email: req.params.uid})
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).send('Erro na consulta dos utilizadores!'))
})

// Registo de um utilizador
router.post('/', passport.authenticate('registo', {
	session: false,
	successRedirect: '/users/login',
	failureRedirect: '/users'
}))

// Login de um utilizador
router.post('/login', async (req,res,next)=>{
	passport.authenticate('login', async (err,user,info)=>{
		try{
			if(err || !user){
				if(err)
					return next(err);
				else
					return next(new Error('Utilizador inexistente!'))
			}
			req.login(user, {session:false}, async (error)=>{
				if(error)
					return next(error)
				var myuser = {_id:user._id,email:user.email};
				// Geração do token
				var token = jwt.sign({user:myuser},'dweb2018');
				req.session.token = token
				res.redirect('/api/users'+user.email)
			});
		}
		catch(error){
			return next(error);
		}
	})(req,res,next);
});

module.exports = router
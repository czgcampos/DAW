var express = require('express');
var router = express.Router();
var passport = require('passport')
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Na cb da homepage: ' + req.sessionID)
  res.render('index');
});

// Login
router.get('/login', (req,res) => {
  console.log('Na cb do GET /login ... : ' + req.sessionID)
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/protegida',
  failureRedirect: '/login'
}))

// Proteger com middleware
function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()) next()
  else res.redirect("/login")
}

router.get('/protegida', verificaAutenticacao, (req,res) => {
    res.send('Atingiste a área protegida!!!')
})

router.get('/users', verificaAutenticacao, (req,res) => {
  axios.get('http://localhost:5011/users')
    .then(dados => res.render('users', {usersList: dados.data}))
    .catch(erro => res.render('error', {error: erro}))
})

module.exports = router;

var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

router.get('/',(req,res) => {
  res.render('index')
})

//Buscar lista de compras
router.get('/compras', verificaAutenticacao, function(req, res) {
  axios.get('http://localhost:4011/api/compras')
    .then(resposta => res.render('compras', {compras: resposta.data}))
    .catch(error => {
      console.log('Error ao carregar da BD!')
      res.render('erro',{error: error,message: 'Erro ao carregar da BD!'})
    })
});

router.get('/compras/nova', verificaAutenticacao, (req,res) => {
  res.render('compranova')
})

router.get('/compras/:estado', verificaAutenticacao, (req,res) => {
  axios.get('http://localhost:4011/api/compras/' + req.params.estado)
    .then(resposta => res.render('compras', {compras: resposta.data}))
    .catch(error => {
      console.log('Error ao carregar da BD!')
      res.render('erro',{error: error,message: 'Erro ao carregar da BD!'})
    })
})


router.post('/compras', verificaAutenticacao,(req,res) => {
  axios.post('http://localhost:4011/api/compras', req.body,config)
    .then(() => res.redirect('http://localhost:4011/compras'))
    .catch(erro => {
      console.log(erro)
      res.redirect('http://localhost:4011/compras')
    })
})

router.get('/users/login', (req,res) => {
  res.render('login')
})

router.post('/users/login', passport.authenticate('local',{
  successRedirect: '/compras',
  failureRedirect: '/users/login'
}))

router.get('/users', verificaAutenticacao, (req,res) => {
  axios.get('http://localhost:4011/api/users')
    .then(resposta => res.render('usersList', {list: resposta.data}))
    .catch(error => {
      console.log('Error ao carregar da BD!')
      res.render('error',{error: error,message: 'Erro ao carregar da BD!'})
    })
})

router.post('/users', (req,res) =>{
  axios.post('http://localhost:4011/api/users', req.body,config)
    .then(() => res.redirect('http://localhost:4011/users/login'))
    .catch(erro => {
      console.log('Erro ao inserir na consola!')
      res.redirect('http://localhost:4011/users')
    })
})

router.get('/users/:username', (req,res) => {
  axios.get('http://localhost:4011/api/users/' + req.params.username)
    .then(dados => res.jsonp(dados.data))
    .catch(() => res.jsonp('erro'))
})

//proteger com middleware
function verificaAutenticacao(req,res,next) {
  if(req.isAuthenticated()) {
    console.log(req.user)
    next()
  } 
  else res.redirect('users/login') 
  
}



module.exports = router;

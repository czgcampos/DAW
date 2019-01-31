var express = require('express');
var router = express.Router();
var axios = require('axios')

// Endpoint to get current user
router.get('/', function(req, res){
  res.render('aboutMe', req.user);
})

router.get('/:idUser', function(req, res) {
    axios.get('http://localhost:5000/api/users/user/' + req.params.idUser)
      .then(resposta=> res.render('aboutMe', { user: resposta.data }))
      .catch(erro => {
        console.log('Erro ao carregar user.')
        res.render('error', {error: erro, message: "Erro ao carregar user da BD."})
      })
})

router.post('/atualiza', function(req, res) {
  axios.post('http://localhost:5000/api/users/atualiza/' + req.user.nickname, {texto: req.body.texto})
      .then(resposta=> res.redirect('/feed'))
      .catch(erro => {
        console.log('Erro ao carregar user.')
        res.render('error', {error: erro, message: "Erro ao carregar user da BD."})
      })
})
  
/* mudar a privacidade */
/*
router.patch('/post/:idPost', function(req, res) {
    axios.patch('http://localhost:5000/api/posts/post/' + req.params.idPost, req.body)
        .then(resposta=> res.render('post', { post: resposta.data }))
        .catch(erro => {
        console.log('Erro ao carregar post.')
        res.render('error', {error: erro, message: "Erro ao carregar post da BD."})
        })
})*/

module.exports = router;
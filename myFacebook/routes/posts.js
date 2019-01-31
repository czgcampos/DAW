var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/post/:idPost', function(req, res) {
    axios.get('http://localhost:5000/api/posts/post/' + req.params.idPost)
      .then(resposta=> res.render('post', { post: resposta.data }))
      .catch(erro => {
        console.log('Erro ao carregar post.')
        res.render('error', {error: erro, message: "Erro ao carregar post da BD."})
      })
})
  
/* mudar a privacidade */
router.get('/privacidade/:idPost', function(req, res) {
    console.log("privacidade");
    axios.patch('http://localhost:5000/api/posts/privacidade/' + req.params.idPost)
        .then(resposta=> res.redirect('back'))
        .catch(erro => {
        console.log('Erro ao carregar post.')
        res.render('error', {error: erro, message: "Erro ao carregar post da BD."})
        })
})

router.get('/like/:idPost', function(req, res) {
      axios.patch('http://localhost:5000/api/posts/like/' + req.params.idPost)
          .then(res.redirect('back'))
          .catch(erro => {
          console.log('Erro ao carregar post.')
          res.render('error', {error: erro, message: "Erro ao carregar post da BD."})
          })
})

router.post('/comentario/:idPost', function(req, res){
    var comentario = req.body.comentario;
    var autor = req.user.nickname;

    var obj = {autor: autor, comentario: comentario}
    //console.log(obj);

    axios.patch('http://localhost:5000/api/posts/comentario/' + req.params.idPost, obj)
            .then(res.redirect('back'))
            .catch(erro => {
          console.log('Erro ao carregar post.')
          res.render('error', {error: erro, message: "Erro ao carregar post da BD."})
    })
})

module.exports = router;
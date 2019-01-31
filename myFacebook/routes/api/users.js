

var express = require('express')
var router = express.Router()
var User = require('../../controllers/api/User')
var url = require('url');

/*
    Get de um post
*/
router.get('/user/:idUser', (req, res) => {
    User.getUserByNick(req.params.idUser)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de user'))
})

router.patch('/alterarimagem/:idUser', (req, res) => {
    User.alteraImagem(req.params.idUser, req.body.fnovo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro no update de user'))
})

router.post('/atualiza/:idUser', (req, res) => {
    User.alteraDescricao(req.params.idUser, req.body.texto)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('Erro no update de user'))
})

module.exports = router
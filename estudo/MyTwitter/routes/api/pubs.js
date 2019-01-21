var express = require('express')
var router = express.Router()
var Pub = require('../../controllers/api/pub')

// API para os pubs

router.get('/', (req,res)=>{
    Pub.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de pubs.'))
})

router.get('/:pid', (req,res)=>{
    Evento.incrementar(req.params.pid)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro no like da pub.'))
})

router.post('/', (req,res)=>{
    Pub.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção de pub.'))
})

module.exports = router
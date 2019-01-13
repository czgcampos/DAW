var express = require('express')
var router = express.Router()
var Evento = require('../../controllers/api/evento')

// API para os eventos

router.get('/', (req,res)=>{
    Evento.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de eventos.'))
})

router.get('/:eid', (req,res)=>{
    Evento.consultar(req.params.eid)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na consulta de evento.'))
})

router.get('/tipo/:t', (req,res)=>{
    Evento.listarTipo(req.params.t)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de eventos por tipo.'))
})

router.get('/data/:d', (req,res)=>{
    Evento.listarData(req.params.d)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de eventos por data.'))
})

router.post('/', (req,res)=>{
    Evento.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção de evento.'))
})

module.exports = router




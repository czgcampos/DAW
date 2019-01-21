var express = require('express')
var router = express.Router()
var Compositor = require('../../controllers/api/compositor')

// API para os compositores

router.get('/', (req,res)=>{
    Compositor.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos compositores.'))
})

router.get('/compositor/:cid', (req,res)=>{
    Compositor.consultar(req.params.cid)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na consulta do compositor.'))
})

router.get('/periodo/:p', (req,res)=>{
    Compositor.listarPeriodo(req.params.p)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de compositores por periodo.'))
})

router.get('/data/:d/periodo/:p', (req,res)=>{
    Compositor.listarPeriodoDataAntes(req.params.d,req.params.p)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de compositores por periodo.'))
})

module.exports = router
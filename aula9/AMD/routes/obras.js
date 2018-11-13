var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obra')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('obras')
})

// Listar as obras
router.get('/obras', function(req, res) {
  Obras.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

// Contar as obras
router.get('/obras/contar', function(req, res) {
  Obras.contar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

// Consultar a obra
router.get('/obras/:oid', function(req, res) {
  Obras.consultar(req.params.oid)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;

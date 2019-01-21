var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  axios.get('http://clav-test.di.uminho.pt/api/classes/nivel/1')
    .then(resposta=> res.render('index', { processos: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

router.get('/:pid', function(req, res) {
  axios.get('http://clav-test.di.uminho.pt/api/classes/' + req.params.pid)
    .then(resposta=> res.render('processo', { processo: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

router.get('/:pid/descendencia', function(req, res) {
  axios.get('http://clav-test.di.uminho.pt/api/classes/'+ req.params.pid +'/descendencia')
    .then(resposta=> res.render('processo', { processo: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

module.exports = router;
var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  axios.get('http://localhost:4010/api/eventos')
    .then(resposta=> res.render('index', { eventos: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

router.get('/eventos', function(req, res) {
  axios.get('http://localhost:4010/api/eventos')
    .then(resposta=> res.render('index', { eventos: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

router.get('/eventos/:eid', function(req, res) {
  axios.get('http://localhost:4010/api/eventos/' + req.params.eid)
    .then(resposta=> res.render('evento', { evento: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar evento.')
      res.render('error', {error: erro, message: "Erro ao carregar evento da BD."})
    })
});

router.post('/eventos', function(req, res) {
  axios.post('http://localhost:4010/api/eventos', req.body)
    .then(()=> res.redirect('http://localhost:4010/'))
    .catch(erro => {
      console.log('Erro ao inserir dados da BD.')
      res.redirect('http://localhost:4010/')
    })
});

module.exports = router;

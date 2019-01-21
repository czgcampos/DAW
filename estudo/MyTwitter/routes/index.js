var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  axios.get('http://localhost:5001/api/pubs')
    .then(resposta=> res.render('index', { pubs: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

router.get('/pubs/:pid', function(req, res) {
  axios.get('http://localhost:5001/api/pubs/' + req.params.pid)
    .then(()=> res.redirect('http://localhost:5001/'))
    .catch(erro => {
      console.log('Erro ao fazer like.')
      res.render('error', {error: erro, message: "Erro ao fazer like."})
    })
});

router.post('/pubs', function(req, res) {
  axios.post('http://localhost:5001/api/pubs', req.body)
    .then(()=> res.redirect('http://localhost:5001/'))
    .catch(erro => {
      console.log('Erro ao inserir dados da BD.')
      res.redirect('http://localhost:5001/')
    })
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/compositores', function(req, res) {
  axios.get('http://localhost:3000/api/compositores')
    .then(resposta=> res.render('index', { compositores: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
});

router.get('/compositores/:cid', function(req, res) {
  axios.get('http://localhost:3000/api/compositores/compositor/' + req.params.cid)
    .then(resposta=> res.render('compositor', { compositor: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar compositor.')
      res.render('error', {error: erro, message: "Erro ao carregar compositor da BD."})
    })
});

router.get('/compositores?periodo=:per', function(req, res) {
  axios.get('http://localhost:3000/api/compositores/periodo/' + req.params.per)
    .then(resposta=> res.render('compositor', { compositor: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar compositor.')
      res.render('error', {error: erro, message: "Erro ao carregar compositor da BD."})
    })
});

router.get('/compositores?data=:dt&periodo=per', function(req, res) {
  axios.get('http://localhost:3000/api/compositores/data/' + req.params.dt + '/periodo/' +req.params.per)
    .then(resposta=> res.render('compositor', { compositor: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar compositor.')
      res.render('error', {error: erro, message: "Erro ao carregar compositor da BD."})
    })
});

module.exports = router;
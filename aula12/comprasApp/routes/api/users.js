var express = require('express');
var router = express.Router();
var User = require('../../controllers/api/utilizadores')

/* GET users listing. */
router.get('/', (req,res) => {
  User.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('Erro: ' + erro))
});


router.post('/', (req,res) => {
  User.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('Erro na listagem de eventos'))
})

router.get('/:username', (req,res) => {
  User.consultar(req.params.username)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('Erro na listagem de eventos'))
})

module.exports = router;

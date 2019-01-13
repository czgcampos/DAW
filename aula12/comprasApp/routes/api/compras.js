var express = require('express');
var router = express.Router();
var Compra = require('../../controllers/api/compras')

/* GET users listing. */
router.get('/', function(req, res) {
  Compra.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('Erro na listagem de eventos'))
});

router.get('/:estado',(req,res) => {
    Compra.consultarPorEstado(req.params.estado)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de eventos'))
})

router.post('/',(req,res) => {
    var novaCompra = req.body
    novaCompra["quem"] =  req.user.username
    // req.user não está a ser reconhecido, apesar de aparentemente o utilizador estar autenticado
    //Só acontece após pedidos axios
    novaCompra["data"] = new Date().toString()
    Compra.inserir(novaCompra)
        .then(dados => res.jsonp("Inserido com sucesso!"))
        .catch(erro => res.status(500).send('Erro na listagem de eventos'))
})

module.exports = router;
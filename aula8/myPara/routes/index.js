var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')

var myBD = __dirname + '/paras.json'

/* GET home page. */
router.get('/', (req, res, next) => res.render('index'))

router.get('/para', (req,res)=>{
  jsonfile.readFile(myBD, (erro, paras)=>{
    if(!erro) res.render('lista', {lista:paras})
    else res.render('error', {e:erro})
  })
})

router.post('/para/guardar', (req,res)=>{
  var p = req.body.para

  jsonfile.readFile(myBD, (erro, paras)=>{
    if(!erro){
      paras.push(p)
      console.dir(paras)
      jsonfile.writeFile(myBD, paras, erro2=>{
        if(!erro2) console.log('Parágrafo gravado com sucesso.')
        else console.log('Erro: ' + erro2)
      })
    }
    else{
      console.log('Erro: ' + e)
    }
  })
  res.json(p)
})

module.exports = router;

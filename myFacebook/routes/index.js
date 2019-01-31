var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')
var fs = require('fs')
let formidable = require('formidable')
var url = require('url');


var User = require('../models/user');
var UserController = require('../controllers/api/user');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
      res.redirect('/feed');
    }
    else {
      res.redirect('/login');
    }
});

/* Log In */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login'
}))

router.get('/registar', function(req, res, next) {
  res.render('register');
});

router.post('/registar', function(req, res) {
    var nome = req.body.nome;
    var nickname = req.body.nickname;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var dataNascimento = req.body.dataNascimento;
    var genero = req.body.genero;
    var localidade = req.body.localidade;

	if (password == password2) {
        var newUser = new User({
            nome : nome,
            nickname: nickname, 
            email : email,
            password :password,
            dataNascimento : dataNascimento,
            genero : genero,
            localidade : localidade
        })

        console.log("novo user")
        console.log(newUser)

        UserController.createUser(newUser, function(err, user) {
            if(err) throw err;
            console.log(user);
            // supostamente falta enviar coisas 
        });
    }
    else {
        // falta mandar um erro
        console.log("palavras passes diferentes");
        res.redirect('/registar');

    }

  res.redirect('/login');
});

// Proteger com middleware
function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()) next()
  else res.redirect("/login")
}

router.get('/feed', (req,res) => {
  var purl = url.parse(req.url, true);
  var query = purl.query;

  if (query.categoria && query.hashtag) var q = "?categoria="+query.categoria+"hashtag="+query.hashtag;
  else if (query.categoria) var q = "?categoria="+query.categoria
        else if (query.hashtag) var q = "?hashtag="+query.hashtag
        else var q = "";
  

  axios.get('http://localhost:5000/api/posts/feedpublico'+q)
    .then(resposta=> {
      if (req.user) res.render('feed', { posts: resposta.data })
      else res.render('feed2', { posts: resposta.data })
    }
      )
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
})

router.get('/adicionarpost', function(req, res, next) {
  res.render('addPost');
});

router.post('/adicionarpost', function(req, res) {
  console.log(req.body);
  axios.post('http://localhost:5000/api/posts/adicionarpost/'+req.user.nickname, req.body)
    .then(()=> res.redirect('http://localhost:5000/feed'))
    .catch(erro => {
      console.log('Erro ao inserir dados da BD.')
      res.redirect('http://localhost:5000/adicionarpost')
    })
});

router.get('/perfilpublico', verificaAutenticacao, (req,res) => {
  axios.get('http://localhost:5000/api/posts/perfilpublico/'+req.user.nickname)
    .then(resposta=> res.render('userPubs', { posts: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
})

router.get('/perfilprivado', verificaAutenticacao, (req,res) => {
  axios.get('http://localhost:5000/api/posts/perfilprivado/'+req.user.nickname)
    .then(resposta=> res.render('userPubs', { posts: resposta.data }))
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
})

router.get('/editarconta', verificaAutenticacao, function(req, res) {
  res.render('editCount', {user: req.user});
})

router.get('/sobremim', verificaAutenticacao, function(req, res, next) {
  console.log(req.user)
  res.render('aboutMe', {user: req.user});
});

router.get('/exportar', verificaAutenticacao, (req,res) => {
  axios.get('http://localhost:5000/api/posts/allposts/'+req.user.email)
    .then(resposta=> {
      var json = JSON.stringify(resposta.data);
      var filename = 'pubs_user.json';
      var mimetype = 'application/json';
      res.setHeader('Content-Type', mimetype);
      res.setHeader('Content-disposition','attachment; filename='+filename);
      res.send(json);
    })
    .catch(erro => {
      console.log('Erro ao carregar dados da BD.')
      res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
    })
})

router.get('/importar', verificaAutenticacao, function(req, res){
  res.render('import');
})

router.post('/importar', verificaAutenticacao, function(req, res) {
    console.log("importar");
    var form = new formidable.IncomingForm()

    form.parse(req, (erro, fields, files) => {
      console.log("entrei")
      console.log(files.ficheiro.name)
      var fenviado = files.ficheiro.path;
      var fnovo = "./public/data/"+files.ficheiro.name;
      var path = "./public/data/"+files.ficheiro.name;

      fs.rename(fenviado, fnovo, err => {
        if(!err){
            var obj = JSON.parse(fs.readFileSync(path, 'utf8', function(err, contents) {
                console.log("li");
                Post.insertMany(obj);
                res.redirect('/feed');
           }));
        }
        else{
          console.log("erro");
          res.redirect('back');
        }
      })
    })  
})

router.get('/user', function(req, res){
  res.send(req.user);
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/facebook',
  passport.authenticate('facebook'));


  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("LOGADO COM O FACEBOOK -> "+req.user)
    res.redirect('/feed');
  }
);

router.post('/alterarimagem', verificaAutenticacao, function(req,res) {
    var form = new formidable.IncomingForm()
    console.log("entrei no post")

    form.parse(req,(erro, fields, files)=>{
        //console.log(files);
        var fenviado = files.ficheiro.path;
        var fnovo = "./public/media/"+files.ficheiro.name;
        var path = "media/"+files.ficheiro.name;
        fs.rename(fenviado, fnovo, err => {
          if(!err){
            axios.patch('http://localhost:5000/api/users/alterarimagem/'+req.user.nickname, {fnovo: path})
                .then(res.redirect('/feed'))
                .catch(erro => {
                  console.log('Erro ao carregar dados da BD.')
                  res.render('error', {error: erro, message: "Erro ao carregar dados da BD."})
            })
          }
          else{
            console.log("erro");
            res.redirect('back');
          }
        })
    });
})

module.exports = router;

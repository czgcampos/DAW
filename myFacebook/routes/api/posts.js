var express = require('express')
var router = express.Router()
var Post = require('../../controllers/api/post')
var url = require('url');

var PostModel = require('../../models/post');

/*
    /feedpublico -> devolve todas as publicações com privacidade Publica e suporta querys no url para categoria e hashtag

    p.e.: /feedpublico?categoria=Evento&hashtag=pub

    - Funciona
*/
router.get('/feedpublico', (req,res)=>{
    var purl = url.parse(req.url, true);
    var query = purl.query;
    Post.listaPostsPublicos(query.categoria, query.hashtag)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de posts.'))
})

/*
    /perfilpublico -> devolve todas as publicações do utilizador X com privacidade Pública e suporta querys no url para categoria e hashtag
*/
router.get('/perfilpublico/:idUser', (req,res)=>{
    var purl = url.parse(req.url, true);
    var query = purl.query;

    Post.listaPostsPublicosAutor(req.params.idUser, query.categoria, query.hashtag)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de posts.'))
})


/*
    /perfilprivador -> devolve todas as publicações do utilizador X com privacidade Privada e suporta querys no url para categoria e hashtag
*/
router.get('/perfilprivado/:idUser', (req,res)=>{
    var purl = url.parse(req.url, true);
    var query = purl.query;

    Post.listaPostsPrivadosAutor(req.params.idUser, query.categoria, query.hashtag)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de posts.'))
})

/*
    Inserir um Post
*/
router.post('/adicionarpost/:idAutor', (req,res)=>{
    if (req.body.privacidade == "publico") var c = true;
    else var c = false;

    var newPost = new PostModel({
        autor: req.params.idAutor,
        texto: req.body.texto,
        categoria: req.body.categoria,
        hashtag: req.body.hashtag,
        privacidade: c
    })

    Post.inserirPost(newPost)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send('Erro na inserção de Post.'))
    
})

/*
    Get de um post
*/
router.get('/post/:idPost', (req, res) => {
    Post.getPost(req.params.idPost)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de post'))
})

/*
    Recebe o objeto normalmente
*/
router.patch('/privacidade/:idPost', (req, res) => {
    Post.atualizaPrivacidade(req.params.idPost)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na atualização do post'))
})

router.patch('/like/:idPost', (req, res) => {
    Post.fazerLike(req.params.idPost)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na atualização do post'))
})

router.get('/allposts/:idUser', (req,res)=>{
    Post.listaTodosUser(req.params.idUser)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de posts.'))
})

router.patch('/comentario/:idPost', (req, res) => {
    //console.log(req.params.idPost+" -> "+req.body.autor+" -> "+req.body.comentario)
    Post.addComentario(req.params.idPost, req.body.autor, req.body.comentario)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro no comentario de posts.'))
})

module.exports = router


var Post = require('../../models/post')

var ObjectId = require('mongoose').Types.ObjectId; 

// Devolve a informação de uma publicação
module.exports.getPost = pid => {
	return Post
		.findOne({_id: pid})
		.exec()
}

module.exports.listaTodosUser = autor => {
	return Post
			.find({
				autor: autor
			})
			.exec()
}

// Insere uma publicação
module.exports.inserirPost = post => {
	return Post.create(post)
}

// Fazer um comentário
module.exports.comentar = (pid,autor,comentario) => {
	return Post
		.update({_id: pid},{$push:{comentarios:[autor,comentário]}})
		.exec()
}

// suporta querys de categoria e hastag
module.exports.listaPostsPublicos = (categoria, hashtag) => {
	if (categoria && hashtag) {
		return Post
			.find({
				categoria: categoria,
				hashtag: hashtag,
				privacidade: false
			})
			.sort({data: -1})
			.exec()
	}
	else if (categoria && !hashtag) {
		return Post
			.find({
				categoria: categoria,
				privacidade: false
			})
			.sort({data: -1})
			.exec()
	}
	else if (!categoria && hashtag) {
		return Post
			.find({
				hashtag: hashtag,
				privacidade: false
			})
			.sort({data: -1})
			.exec()
	}
	else {
		return Post
			.find({
				privacidade:false
			})
			.sort({data: -1})
			.exec()
	}
}

// suporta querys de categoria e hastag
module.exports.listaPostsPublicosAutor = (autor, categoria, hashtag) => {
	if (categoria && hashtag) {
		return Post
			.find({
				autor: autor,
				categoria: categoria,
				hashtag: hashtag,
				privacidade: false
			})
			.sort({data: -1})
			.exec()
	}
	else if (categoria && !hashtag) {
		return Post
			.find({
				autor: autor,
				categoria: categoria,
				privacidade: false
			})
			.sort({data: -1})
			.exec()
	}
	else if (!categoria && hashtag) {
		return Post
			.find({
				autor: autor,
				hashtag: hashtag,
				privacidade: false
			})
			.sort({data: -1})
			.exec()
	}
	else {
		return Post
			.find({
				autor: autor,
				privacidade:false
			})
			.sort({data: -1})
			.exec()
	}
}

module.exports.listaPostsPrivadosAutor = (autor, categoria, hashtag) => {
	if (categoria && hashtag) {
		return Post
			.find({
				autor: autor,
				categoria: categoria,
				hashtag: hashtag,
				privacidade: true
			})
			.sort({data: -1})
			.exec()
	}
	else if (categoria && !hashtag) {
		return Post
			.find({
				autor: autor,
				categoria: categoria,
				privacidade: true
			})
			.sort({data: -1})
			.exec()
	}
	else if (!categoria && hashtag) {
		return Post
			.find({
				autor: autor,
				hashtag: hashtag,
				privacidade: true
			})
			.sort({data: -1})
			.exec()
	}
	else {
		return Post
			.find({
				autor: autor,
				privacidade: true
			})
			.sort({data: -1})
			.exec()
	}
}

// Devolve a informação de uma publicação
module.exports.atualizaPrivacidade = (id) => {
	return Post.findOne({_id: id}, function(err, post){            
				if(post){
					post.privacidade = !post.privacidade
					post.save(function(erro) {
						if (erro) console.log('Erro na privacidade do post: ' + erro);
					});
				}else{
					console.log(err);
				}
			})
			.exec();
}

module.exports.fazerLike = (id) => {
	return Post.findOne({_id: id}, function(err, post){            
				if(post){
					post.likes += 1
					post.save(function(erro) {
						if (erro) console.log('Erro no gosto do post: ' + erro);
					});
				}else{
					console.log(err);
				}
			})
			.exec();
}

module.exports.addComentario = (id, autor, comentario) => {
	return Post.findOne({_id:id}, function(err,post) {
		if (post) {
			post.comentarios.push({autor: autor, comentario: comentario})
			post.save(function(erro) {
				if (erro) console.log("erro no comentario "+erro);
			})
		} else {
			console.log(erro);
		}
	})
		.exec();
}

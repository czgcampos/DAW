var Post = require('../../models/post')

// Lista de publicações
module.exports.posts = () => {
	return Post
		.find()
		.sort({data: -1})
		.exec()
}

// Lista as publicações do autor A
module.exports.postsAutor = autor => {
	return Post
		.find({autor: autor})
		.sort({data: -1})
		.exec()
}

// Devolve a informação de uma publicação
module.exports.post = pid => {
	return Post
		.findOne({_id: pid})
		.exec()
}

// Lista as publicações da categoria C
module.exports.postsCategoria = categoria => {
	return Post
		.find({categoria: categoria})
		.sort({data: -1})
		.exec()
}

// Lista as publicações com uma hashtag
module.exports.postsHashtag = hashtag => {
	return Post
		.find({hashtag: hashtag})
		.sort({data: -1})
		.exec()
}

// Fazer like
module.exports.likeInc = pid => {
	return Post
		.update({_id: pid},{$inc: {likes: 1}})
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
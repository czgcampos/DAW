var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentsSchema = new Schema({
	// o autor é identificado pelo email (unico)
	autor: {type: String, required: true},
	comentario: {type: String, required: true}
})

var PostSchema = new Schema({
	autor: {type: String},
	texto: {type: String},
	data: {type: Date, default: Date.now},
	comentarios: [CommentsSchema],
	categoria: {type: String},
	likes: {type: Number, default: 0},
	hashtag: {type: String},
	// ficamos só com o path
	ficheiro: {type : String},
	privacidade: {type : Boolean}
})

module.exports = mongoose.model('Posts', PostSchema, 'posts')
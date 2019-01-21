var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentsSchema = new Schema({
	autor: {type: String, required: true},
	comentario: {type: String, required: true}
})

var PostSchema = new Schema({
	autor: {type: String, required: true},
	texto: {type: String, required: true},
	data: {type: Date, default: Date.now},
	comentarios: [CommentsSchema],
	categoria: {type: String},
	likes: {type: Number, default: 0},
	hashtag: {type: String},
	ficheiro: {type : Buffer}
})

module.exports = mongoose.model('Posts', PostSchema, 'posts')
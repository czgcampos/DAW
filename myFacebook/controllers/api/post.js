var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentsSchema = new Schema({
	author: {type: String, required: true},
	comment: {type: String, required: true}
})

var PostSchema = new Schema({
	author: {type: String, required: true},
	texto: {type: String, required: true},
	date: {type: Date, default: Date.now},
	comments: [CommentsSchema],
	category: {type: String},
	likes: {type: Number, default: 0},
	file: {type : Buffer}
})

module.exports = mongoose.model('Posts', PostSchema, 'posts')
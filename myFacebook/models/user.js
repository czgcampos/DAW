var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	nickname: {type: String, index:true},
	nome: {type: String},
	email: {type: String, index: true},
	password: {type: String},
	dataNascimento : {type: Date},
	genero: {type: String},
	localidade: {type: String},
	descricao: {type: String},
	// guarda-se o path (acho que é melhor)
	imagem: {type: String},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}
})

module.exports = mongoose.model('Users', UserSchema, 'users')
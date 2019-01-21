var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	image: {type: Buffer}
})

module.exports = mongoose.model('Users', UserSchema, 'users')
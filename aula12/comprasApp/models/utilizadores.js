var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required: true},
    nome: {type:String}
})

module.exports = mongoose.model('Utilizador',userSchema,'utilizadores')
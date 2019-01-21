var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PubSchema = new Schema({
    texto: {type: String, required: true},
    autor: {type: String, required: true},
    hash: {type: String, required: true},
    likes: {type: Number, default: 0}
})

module.exports = mongoose.model('Pubs', PubSchema, 'pubs')
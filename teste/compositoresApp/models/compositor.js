var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CompositorSchema = new Schema({
    id: {type: String, required: true},
    nome: {type: String, required: true},
    bio: {type: String},
    dataNasc: {type: String},
    dataObito: {type: String},
    periodo: {type: String}
})

module.exports = mongoose.model('Compositor', CompositorSchema, 'compositores')
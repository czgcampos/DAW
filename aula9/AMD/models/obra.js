var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PartituraSchema = new Schema({
    path: {type: String, required: true},
    voz: {type: String},
    clave: {type: String},
    afinacao: {type: String}
})

var InstrumentoSchema = new Schema({
    nome: {type: String, required: true},
    partitura: PartituraSchema
})

var ObraSchema = new Schema({
    _id: {type: String, required: true},
    tipo: {type: String, required: true},
    titulo: {type: String, required: true},
    compositor: {type: String},
    instrumentos: [InstrumentoSchema]
})

module.exports = mongoose.model('Obra', ObraSchema, 'obras')
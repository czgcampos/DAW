var mongoose = require('mongoose')
var Schema = mongoose.Schema

var HorarioSchema = new Schema({
    hinicio: {type: String},
    hfim: {type: String}
})

var EventoSchema = new Schema({
    data: {type: String, required: true},
    horario: HorarioSchema,
    tipo: {type: String, required:true},
    designacao: {type: String},
    local: {type: String},
    informacoes: {type: String}
})

module.exports = mongoose.model('Evento', EventoSchema, 'eventos')
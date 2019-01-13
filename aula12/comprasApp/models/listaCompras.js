var mongoose = require('mongoose')
var Schema = mongoose.Schema

var compraSchema =  new Schema({
    produto: {type:String, required:true},
    quantidade: {type:String, required:true},
    data: {type:String,required:true},
    quem: {type:String, required:true},
    estado: {type:String, required:true}
})

module.exports = mongoose.model('Compra',compraSchema,'compras')


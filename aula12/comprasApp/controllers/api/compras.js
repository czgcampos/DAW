var Compra = require('../../models/listaCompras')

module.exports.listar = () => {
    return Compra.find()
            .sort({data:-1})
            .exec()
}

module.exports.consultarPorEstado = estado => {
    return Compra.find({estado: estado})
                 .sort({data:-1})
                 .exec()
}

module.exports.inserir = compra => {
    return Compra.create(compra)
}
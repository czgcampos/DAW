var Compositor = require('../../models/compositor')

module.exports.listar = () => {
    return Compositor
        .find({},{id:true, nome:true, dataNasc:true})
        .exec()
}

module.exports.consultar = cid => {
    return Compositor
        .find({id: cid})
        .exec()
}

module.exports.listarPeriodo = per => {
    return Compositor
        .find({periodo: per})
        .exec()
}

module.exports.listarPeriodoDataAntes = (dt,per) => {
    return Compositor
        .find({periodo: per,dataNasc:{$gte:dt}})
        .exec()
}
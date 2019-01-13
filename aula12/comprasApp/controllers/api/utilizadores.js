var Utilizador = require('../../models/utilizadores')

module.exports.listar = () => {
        return Utilizador.find()
                        .sort({username: -1})
                        .exec()
}

module.exports.inserir = user => {
    return Utilizador.create(user)
}

module.exports.consultar = username => {
    return Utilizador.findOne({username: username}).exec()
}


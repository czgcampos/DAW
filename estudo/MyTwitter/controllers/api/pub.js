var Pub = require('../../models/pub')

// Lista de pubs
module.exports.listar = () => {
    return Pub
        .find()
        .exec()
}

module.exports.incrementar = pid => {
    return Pub
        .findOne({_id: eid})
        .exec()
}

module.exports.inserir = pub => {
    return Pub.create(pub)
}
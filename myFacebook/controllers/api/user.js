var User = require('../../models/user')

// Lista de utilizadores
module.exports.users = () => {
	return User
		.find()
		.sort({nome: -1})
		.exec()
}

// Devolve a informação de um user pelo email
module.exports.post = email => {
	return User
		.findOne({email: email})
		.exec()
}

// Insere um user
module.exports.inserirUser = user => {
	return User.create(user)
}
var Obra = require('../models/obra')

const Obras = module.exports

// Devolve a lista de obras
Obras.listar = () => {
	return Obra
		.find()
		.sort({titulo:1})
		.exec()
}

Obras.consultar = oid => {
	return Obra
		.findOne({_id: oid})
		.exec()
}

Obras.contar = () => {
	return Obra
		.countDocuments()
		.exec()
}

Obras.projetar = campos => {
	return Obra
		.find({},{campos})
		.exec()
}

Obras.agregar = campo => {
	return Obra
		.agregate([{$group: {_id: "$" + campo, contador: {$sum: 1}}},{$sort: {contador: -1}}])
		.exec()
}
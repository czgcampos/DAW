var fs = require('fs')
var jwt = require('jsonwebtoken')

var user = {
	name: "Carlos Campos",
	inst: "Universidade do Minho"
}

var privateKey = fs.readFileSync('./private.key')
var publicKey = fs.readFileSync('./public.key')

var signOptions = {
	issuer: "Agenda MicroApp",
	subject: "Gestão de eventos",
	audience: "Consumidor",
	expiresIn: "1h",
	algorithm: "RS256"
}

var token = jwt.sign(user, privateKey, signOptions)
console.log("Token: "+token)

console.log("==============Verificação==============")

var verifyOptions = {
	issuer: "Agenda MicroApp",
	subject: "Gestão de eventos",
	audience: "Consumidor",
	expiresIn: "1h",
	algorithm: "RS256"
}

var verificacao = jwt.verify(token, publicKey, verifyOptions)
console.log('Verificação: '+JSON.stringify(verificacao))
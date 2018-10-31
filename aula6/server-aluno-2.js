var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')

var {parse} = require('querystring')

var myServer = http.createServer((req,res)=>{
	var purl = url.parse(req.url, true)
	var query = purl.query

	console.log('Recebi o pedido ' + purl.pathname)
	console.log('Com a metodo ' + req.method)

	if(req.method == 'GET'){
		if(purl.pathname == '/registo'){
			res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(pug.renderFile('form-aluno.pug'))
			res.end()
		}
		else if(purl.pathname == '/processaForm'){
			res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(pug.renderFile('aluno-recebido.pug', {aluno: query}))
			res.end()
		}
		else if(purl.pathname == '/w3.css'){
			res.writeHeader(200, {'Content-Type': 'text/css'})
			fs.readFile('stylesheets/w3.css', (erro, dados)=>{
				if(!erro)
					res.write(dados)
				else
					res.write(pug.renderFile('erro.pug', {e: erro}))
				res.end()
			})
		}
		else{
			res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(pug.renderFile('erro.pug', {e: "Erro: "+purl.pathname+" não está implementado!"}))
			res.end()
		}
	}
	else if(req.method == 'POST'){
		if(purl.pathname == '/processaForm'){
			recuperaInfo(req, resultado => {
				console.log('Info recebida ' + JSON.stringify(resultado))
				res.end(pug.renderFile('aluno-recebido.pug', {aluno: resultado})) //Se não tiver writeHeader assume 200
			})
		}
		else{
			res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(pug.renderFile('erro.pug', {e: "Erro: "+purl.pathname+" não está implementado!"}))
			res.end()
		}
	}
	else{
		res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.write(pug.renderFile('erro.pug', {e: "Metodo: "+req.method+" não suportado!"}))
		res.end()
	}
})

myServer.listen(4006, ()=>{
	console.log('Servidor à escuta na porta 4006...')
})

function recuperaInfo(request, callback){
	if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
		let body = ''
		request.on('data', bloco => {
			body += bloco.toString()
		})
		request.on('end', () => {
			callback(parse(body))
		})
	}
	else
		callback(null)
}
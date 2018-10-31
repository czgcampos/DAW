var express = require('express')
var http = require('http')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')
var logger = require('morgan')

var app = express()

app.use(logger('combined'))

app.all('*', (req,res,next)=>{
	if(req.url != '/w3.css')
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	next()
})

app.get('/', (req,res)=>{
	res.write(pug.renderFile('form-ficheiro.pug'))
	res.end()
})

app.get('/w3.css', (req,res)=>{
	res.writeHead(200, {'Content-Type': 'text/css'})
	fs.readFile('stylesheets/w3.css', (erro, dados)=>{
		if(!erro)
			res.write(dados)
		else
			res.write(pug.renderFile('erro.pug', {e: erro}))
		res.end()
	})
})

app.post('/processaForm', (req,res)=>{
	var form = new formidable.IncomingForm()
	form.parse(req,(erro, fields, files)=>{
		var fenviado = files.ficheiro.path
		var fnovo = './uploaded/'+files.ficheiro.name

		fs.rename(fenviado, fnovo, err => {
			if(!err){
				res.write(pug.renderFile('ficheiro-recebido.pug',
					{ficheiro: files.ficheiro.name,
					status: 'Ficheiro recebido e guardado com sucesso'}))
				res.end()
			}
			else{
				res.write(pug.renderFile('erro.pug'), {e: 'Ocorreram erros no upload do ficheiro'})
				res.end()
			}
		})
	})
})

var myServer = http.createServer(app)

myServer.listen(4007, ()=>{
	console.log('Servidor à escuta na porta 4007...')
})
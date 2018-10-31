var http = require('http')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')

var myServer = http.createServer((req,res)=>{
	console.log('Recebi o pedido ' + req.url)
	console.log('Method: ' + req.method)
	console.log('=====================================')

	if (req.method === 'POST'){
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
				}
			})
		})
	}
	else if(req.url == '/w3.css'){
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
		res.write(pug.renderFile('form-ficheiro.pug'))
		res.end()
	}
})

myServer.listen(4007, ()=>{
	console.log('Servidor à escuta na porta 4007...')
})
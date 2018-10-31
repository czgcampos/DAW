var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')

var {parse} = require('querystring')

var myBD = "tarefas.json"

var myServer = http.createServer((req,res)=>{
	var purl = url.parse(req.url, true)
	var query = purl.query
	if(req.method == 'GET'){
		if((purl.pathname == '/')||(purl.pathname == '/index')||(purl.pathname == '/lista')){
			jsonfile.readFile(myBD, (erro, tarefas)=>{
				if(!erro){
					res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write(pug.renderFile('index.pug', {lista: tarefas}))
					res.end()
				}
				else{
					res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
					res.write(pug.renderFile('erro.pug', {e: "Erro: na lista da base de dados"}))
					res.end()
				}
			})
		}
		else if(purl.pathname == '/registo'){
			res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(pug.renderFile('form-tarefa.pug'))
			res.end()
		}
		else if(purl.pathname == '/processaForm'){
			jsonfile.readFile(myBD,(erro, tarefas)=>{
				if(!erro){
					tarefas.push({dataReg:purl.query.dataReg,dataConc:purl.query.dataReg,descrip:purl.query.descrip,tipo:purl.query.tipo,estado:true})
					jsonfile.writeFile(myBD, tarefas, erro =>{
						if(erro)
							console.log(erro)
						else
							console.log('Registo gravado com sucesso.')
					})
				}
			})
			res.end(pug.renderFile('tarefa-registada.pug', {tarefa: query}))
		}
		else if(purl.pathname == '/tarefaConcluida'){
			jsonfile.readFile(myBD,(erro, tarefas)=>{
				if(!erro){
					var pos = tarefas.findIndex(t=>(t.dataReg === purl.query.dataReg && t.dataConc === purl.query.dataConc && t.descrip === purl.query.descrip && t.tipo === purl.query.tipo && t.estado === true))
					tarefas[pos].estado=false
					jsonfile.writeFile(myBD, tarefas, erro =>{
						if(erro)
							console.log(erro)
						else
							console.log('Registo concluído com sucesso.')
					})
				}
			})
			res.end(pug.renderFile('tarefa-concluida.pug', {tarefa: query}))
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
				jsonfile.readFile(myBD,(erro, tarefas)=>{
					if(!erro){
						tarefas.push(resultado)
						jsonfile.writeFile(myBD, tarefas, erro =>{
							if(erro)
								console.log(erro)
							else
								console.log('Registo gravado com sucesso.')
						})
					}
				})
				res.end(pug.renderFile('tarefa-registada.pug', {tarefa: resultado}))
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

myServer.listen(4008, ()=>{
	console.log('Servidor à escuta na porta 4008...')
})

function recuperaInfo(request, callback){
	if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
		let body = ''
		request.on('data', bloco => {
			body += bloco.toString()+",\"estado\":"+true
		})
		request.on('end', () => {
			callback(parse(body))
		})
	}
	else
		callback(null)
}
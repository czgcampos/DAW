var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'text/html'})
	var myObj = url.parse(req.url, true)
	if(myObj.pathname==='/index'){
		fs.readFile('website/index.html',(erro,dados)=>{
			if(!erro)
				res.end(dados)
			else
				res.end('<p><b>ERRO: </b>'+erro+'</p>')
		})
	}else if(myObj.pathname==='/arq'){
		fs.readFile('website/html/'+myObj.query.id+'.html',(erro,dados)=>{
			if(!erro)
				res.end(dados)
			else
				res.end('<p><b>ERRO: </b>'+erro+'</p>')
		})
	}else
		res.end('<p><b>ERRO: 404</b></p>')
}).listen(4005,()=>{
	console.log('Servidor à escuta na porta 4005...')
})
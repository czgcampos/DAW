var http = require('http')
var fs = require('fs')

http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'text/html'})
	fs.readFile('website/index.html',(erro,dados)=>{
		if(!erro)
			res.write(dados)
		else
			res.write('<p><b>ERRO: </b>'+erro+'</p>')
		res.end()
	})
}).listen(4004,()=>{
	console.log('Servidor à escuta na porta 4004...')
})
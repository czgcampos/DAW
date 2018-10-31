var http = require('http')

http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.end('Olá turma de 2018!')
	console.log(req)
}).listen(3333, ()=>{
	console.log('Servidor à escuta na porta 3333...')
})
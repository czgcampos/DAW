var http = require('http')
var mymod = require('./mymod')

http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'text/html'})
	res.write('Pedido recebido em '+mymod.data()+' por server1 desenvolvido por '+mymod.autor)
	res.end()
}).listen(4001,()=>{
	console.log('Servidor à escuta na porta 4001...')
})
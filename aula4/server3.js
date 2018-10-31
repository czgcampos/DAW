var http = require('http')
var url = require('url')

http.createServer((req,res)=>{
	var myObj = url.parse(req.url, true)
	var r = parseInt(myObj.query.n1)*parseInt(myObj.query.n2)
	res.writeHead(200,{'Content-Type':'text/html'})
	res.end('<p>'+myObj.query.n1+' * '+myObj.query.n2+' = '+r+'</p>')
}).listen(4003, ()=>{
	console.log('Servidor à escuta na porta 4003...')
})
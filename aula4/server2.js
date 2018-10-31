var http = require('http')
var url = require('url')

http.createServer((req,res)=>{
	var myObj = url.parse(req.url, true)
	res.writeHead(200,{'Content-Type':'text/html'})
	res.write('<dl>')
	res.write('<dt>Host</dt><dd>'+myObj.host+'</dd>')
	res.write('<dt>URL</dt><dd>'+myObj.pathname+'</dd>')
	res.write('<dt>Query</dt><dd>'+JSON.stringify(myObj.query)+'</dd>')
	res.write('</dl>')
	res.end()
}).listen(4002, ()=>{
	console.log('Servidor à escuta na porta 4002...')
})
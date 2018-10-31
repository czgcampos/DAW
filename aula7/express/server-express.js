var express = require('express')
var http = require('http')

var app = express()

app.use((req,res)=>{
	res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'})
	res.end('Olá!')
})

http.createServer(app).listen(4007, ()=>{
	console.log('Servidor à escuta na porta 4007...')
})
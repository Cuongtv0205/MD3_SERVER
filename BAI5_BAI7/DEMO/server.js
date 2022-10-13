const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res){
fs.readFile('.views/index.html','utf8',(err, data)=>{

    })
})

server.listen(3000,()=>{
    console.log('Server Running')
})
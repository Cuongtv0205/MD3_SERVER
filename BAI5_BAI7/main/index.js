const http = require('http');
const url = require('url');
const  StringDecode = require('string_decoder').StringDecoder

const server = http.createServer((req,res)=>{
    const parseUrl = url.parse(req.url,true);
    const queryStringObject = parseUrl.query;
    res.end('Hello Node js');

    console.log(queryStringObject);
    // console.log('Done')
})

server.listen(3000,()=>{
    console.log('this server is listening')
})
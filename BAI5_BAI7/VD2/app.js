const http = require('http');
const url = require('url');

const StringDecoder = require('string_decoder').StringDecoder;

let buffer = '';
const server = http.createServer(function (req, res) {

    const decoder = new StringDecoder('utf-8');

    req.on('data', function (data) {
        buffer += decoder.write(data)
    })

    req.on('end', function (end) {
        buffer += decoder.end()
        res.end('Hello Node Js');
        console.log("Done");
        console.log(buffer);
    })
})

//server start
server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})
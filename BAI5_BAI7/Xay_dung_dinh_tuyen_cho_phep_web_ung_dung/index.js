const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function (req, res) {
    const parseUrl = url.parse(req.url, true);
// //get the path
    const path = parseUrl.pathname;
    const trimPath = path.replace(/^\/+|\/+$/g, '');

    console.log(trimPath);
    res.end();

    req.on('data', function (data) {
    });
    req.on('end', function (end) {
        const chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        const data=
            {
                "trimPath": trimPath
            };
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            const payLoadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payLoadString);
            //log the request
            console.log("status "+ statusCode + "payload" + payload);
        });

    });

});

server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})

const handlers = {};

handlers.sample = function (data, callback) {
    callback(406, {'name': 'sample handle'});
};
handlers.notFound = function (data, callback) {
    callback(404);
};

handlers.home = function (data, callback) {
    callback(200, 'Home page');
};
const router = {
    'sample': handlers.sample,
    'home': handlers.home,
}





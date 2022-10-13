const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req,res)=>{
    let parserUrl = url.parse(req.url,true);
    let path = parserUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '')

    let chosenHandler;
    if(typeof router[trimPath] === 'undefined'){
        chosenHandler = handlers.notFound;
    }else {
        chosenHandler = router[trimPath];
    }
    chosenHandler(req,res);
});

const handlers = {}
const router = {
    'users': handlers.users,
    'products': handlers.products
}

handlers.users = function (rep,res){
    fs.readFile('./views/users.html','utf-8',(err, users)=>{
        res.writeHead(200 ,'text/html');
        res.write(users);
        res.end();
    });
}

handlers.products = function (req,res){
    fs.readFile('./views/products.html','utf-8',(err,product)=>{
        res.writeHead(200,'text/html');
        res.write(product);
        res.end();
    })
}

handlers.notFound = function (rep,res){
    fs.readFile('./views/notFound.html','utf-8',(err,notfound)=>{
        res.writeHead(200,'text/html');
        res.write(notfound);
        res.end();
    })
}

server.listen(8080,()=>{
    console.log('Server running');
})

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('qs');

const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url, true) // trả về đối tượng chứa đường link mình tương tác
    let pathName = urlParse.pathname;
    let trimPath = pathName.replace(/^\/+|\/+$/g, '');
    let chosenHandle;

    if (typeof router[trimPath] === 'undefined') {
        chosenHandle = handlers.notfound;
    } else {
        chosenHandle = router[trimPath];
    }
    chosenHandle(req, res);
});


let handlers = {};
handlers.login = function (req, res) {

}

handlers.home = function (req, res) {
    let userHtml = '';
    fs.readFile('./data/users.json', 'utf-8', (err, users) => {
        users = JSON.parse(users); // biến users ra mảng
        users.forEach((item, index) => {
            userHtml += `${index + 1} : ${item.name} : ${item.password} <br>`;
        });
        fs.readFile('./view/index.html', 'utf-8', (err, indexHtml) => {
            res.writeHead(200, "text/html");
            indexHtml = indexHtml.replace('{users}', userHtml);
            res.write(indexHtml);
            res.end();
        });
    })
}

handlers.notfound = function (req, res) {
    fs.readFile('./view/notfound.html', 'utf-8', (err, data) => {
        res.writeHead(200, "text/html");
        res.write(data);
        res.end();
    });
}

handlers.register = function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./view/register.html', 'utf-8', (err, data) => {
            res.writeHead(200, "text/html");
            res.write(data);
            res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {

            const userInfo = qs.parse(data); //Objcet
            let users = []; // Biến là mảng để lưu object vì Json chỉ chỉ mảng đối tượng
            fs.readFile('./data/users.json', 'utf-8', (err, usersJson) => {
                users = JSON.parse(usersJson);
                users.push(userInfo);
                users = JSON.stringify(users) // sau khi chuyển về json và được lưu
                fs.writeFile('./data/users.json', users, err => {
                    console.log(err)
                });




                res.writeHead(301, {'location': '/home'});
                res.end();
            })
        })
    }

    fs.readFile('./view/register.html', 'utf-8', (err, data) => {
        res.writeHead(200, "text/html");
        res.write(data);
        res.end();
    });

}

let router = {
    "home": handlers.home,
    "login": handlers.login,
    "register": handlers.register
}

server.listen(8080, () => {
    console.log('Server running!')
});
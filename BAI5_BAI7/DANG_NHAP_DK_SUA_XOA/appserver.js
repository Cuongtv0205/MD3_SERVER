const http = require('http')
const fs = require('fs');
const url = require('url');
const qs = require('qs');

const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url, true) // trả về đối tượng chứa đường link mình tương tác
    let pathName = urlParse.pathname;
    let arrPath = pathName.split('/'); // cắt lấy ra 3 phần tử

    let trimPath = arrPath[1];
    let chosenHandle;

    if (typeof router[trimPath] === 'undefined') {
        chosenHandle = handlers.notfound;
    } else {
        chosenHandle = router[trimPath];
    }
    chosenHandle(req, res, arrPath[2]);
});


let handlers = {};
handlers.login = function (req, res) {
    if (req.method === 'GET') {  // method post ở html
        fs.readFile('./views/login.html', 'utf-8', (err, data) => {
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
                users = JSON.stringify(users) // sau khi chuyển về json và được lưu dưới dạng string
                fs.writeFile('./data/users.json', users, err => {
                    console.log(err)
                });

                res.writeHead(301, {'location': '/home'});
                res.end();
            })
        })

    }
}
handlers.home = function (req, res) {
    let userHtml = '';
    fs.readFile('./data/users.json', 'utf-8', (err, users) => {
        users = JSON.parse(users); // biến users ra mảng
        users.forEach((item, index) => {
            userHtml += `STT: ${index + 1} : ${item.name} : ${item.password} <a href="edit/${index}">Sửa</a> | <a href="delete/${index}">Xóa</a> <br>`;
        });
        fs.readFile('./views/index.html', 'utf-8', (err, indexHtml) => {
            res.writeHead(200, "text/html");
            indexHtml = indexHtml.replace('{users}', userHtml);
            res.write(indexHtml);
            res.end();
        });
    })
}

handlers.notfound = function (req, res) {
    fs.readFile('./views/notfound.html', 'utf-8', (err, data) => {
        res.writeHead(200, "text/html");
        res.write(data);
        res.end();
    });
}

handlers.register = function (req, res) {
    if (req.method === 'GET') {  // method post ở html
        fs.readFile('./views/register.html', 'utf-8', (err, data) => {
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
                users = JSON.stringify(users) // sau khi chuyển về json và được lưu dưới dạng string
                fs.writeFile('./data/users.json', users, err => {
                    console.log(err)
                });

                res.writeHead(301, {'location': '/home'});
                res.end();
            })
        })
    }
    fs.readFile('./views/register.html', 'utf-8', (err, data) => {
        res.writeHead(200, "text/html");
        res.write(data);
        res.end();
    });

}

handlers.edit = function (req, res, index) {
    if (req.method === 'GET') {  // method post ở html
        fs.readFile('./views/edit.html', 'utf-8', (err, data) => {
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

                for (let i = 0; i < users.length; i++) {
                    if (i === +index) {
                        users[i] = userInfo;
                    }
                }
                users = JSON.stringify(users) // sau khi chuyển về json và được lưu
                fs.writeFile('./data/users.json', users, err => {
                    console.log(err)
                });
                res.writeHead(301, {'location': '/home'});
                res.end();
            })
        })
    }
}

handlers.delete = function (req, res, index) {
    if (req.method === 'GET') {  // method post ở html
        fs.readFile('./views/delete.html', 'utf-8', (err, data) => {
            res.writeHead(200, "text/html");
            res.write(data);
            res.end();
        });
    }
    if (req.method === 'POST') {
        let users = []; // Biến là mảng để lưu object vì Json chỉ chỉ mảng đối tượng
        fs.readFile('./data/users.json', 'utf-8', (err, usersJson) => {
            users = JSON.parse(usersJson);
            for (let i = 0; i < users.length; i++) {
                if (i === +index) {
                    users.splice(index, 1);
                }
            }
            users = JSON.stringify(users) // sau khi chuyển string, json và được lưu
            fs.writeFile('./data/users.json', users, err => {
                console.log(err)
            });
            res.writeHead(301, {'location': '/home'});
            res.end();
        })
    }
}

let router = {
    "home": handlers.home,
    "login": handlers.login,
    "register": handlers.register,
    "edit": handlers.edit,
    "delete": handlers.delete
}

server.listen(8080, () => {
    console.log('Server running!')
});
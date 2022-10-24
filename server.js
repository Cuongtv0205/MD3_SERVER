const http = require('http');
const fs = require('fs');
const handle = require('./controller/router'); // bắt router ở handler
const url = require('url');
const NotFoundRouting = require('./controller/handle/notFoundRouting');


function getUrl(req) {
    const urlParse = url.parse(req.url, true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}

const server = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    if(arrPath.length > 2){
        trimPath = arrPath[1] + '/' + arrPath[2];
    }else {
        trimPath = arrPath[arrPath.length-1];// lấy phần tử cuối cùng là edit, VD: lcalho:3000/home/product/edit
    }
    let chosenHandle;
    if (typeof handle[trimPath] === 'undefined') {
        chosenHandle = NotFoundRouting.showNotFound
    } else {
        chosenHandle = handle[trimPath];
    }
    chosenHandle(req, res, +arrPath[3]);
    //arrPath bắt phần tu do mình định nghĩa tại vị trí home/product/edit/1
})
server.listen(8080, () => {
    console.log('Server running');
})



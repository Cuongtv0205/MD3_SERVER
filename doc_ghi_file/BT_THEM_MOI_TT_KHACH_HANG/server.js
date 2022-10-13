const http = require('http');
const fs = require('fs');
const qs = require('qs');

let server = http.createServer((req, res) => {

    if (req.method === 'GET') {
        fs.readFile('./templates/create.html', 'utf8', (err, data) => {
            res.setHeader('Content-type','text/html');
            res.write(data)
            res.end();
        });

    }
    else {
        // Xử lý submit
        let data = '';
        req.on('data',chunk => {
            data +=  chunk;
        });
        req.on('end',()=>{
            let name = qs.parse(data).name;

            // ghi dữ liệu vào file data.txt
            fs.writeFile('./data/data.txt',name,err => {
                if (err){
                    console.log('err');
                    return;
                }
                return res.end('Success');
            })
        });
        req.on('error',()=>{
            console.log('error')
        })
    }
})
server.listen('8080', () => {
    console.log('Server running port 8080')
})
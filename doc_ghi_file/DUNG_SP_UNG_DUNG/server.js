const http = require('http');
const fs = require('fs');

let server =http.createServer((req,res)=>{
    const obj = JSON.parse(
        {
            "id": 1,
            "name": "iphone 11",
            "price": 20000
        },
        {
            "id": 2,
            "name": "iphone 12",
            "price": 30000
        },
        {
            "id": 3,
            "name": "Samsung Note 21",
            "price": 40000
        }
    )
    let dataFile = '';
    let html = '';
    fs.readFile('./main/text.txt','utf8',(err, data)=>{
        dataFile= JSON.parse(data).obj
        for (let i = 0; i < dataFile.length; i++) {
            html += '<tr>';
            html += `<td>${i+1}</td>`;
            html += `<td>${dataFile[i].id}</td>`;
            html += `<td>${dataFile[i].name}</td>`;
            html += `<td>${dataFile[i].price}</td>`;
            html += `<td><button class="btn btn-danger">Delete</button><td>`;
            html += `<td><button class="btn btn-default">Update</button><td>`;
            html += `</tr>`;
        }
    });
    fs.readFile('./templates/create.html','utf8',(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        data = data.replace('{list-product}',html);
        res.write(data);
        res.end()
    });
})
server.listen('3000',()=>{
    console.log('Server running port 3000')
})
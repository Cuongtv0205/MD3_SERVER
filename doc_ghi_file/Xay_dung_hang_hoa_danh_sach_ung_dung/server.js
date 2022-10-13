const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    let dataFile = '';
    let html = '';
    fs.readFile('./main/text.txt', 'utf8', (err, str) => {
        dataFile = str.split(',')
        for (let i = 0; i < dataFile.length; i++) {
            html += '<tr>';
            html += `<td>${i+1}<td>`;
            html += `<td>${dataFile[i]}<td>`;
            html += `<td><button class="btn btn-danger">Delete</button><td>`;
            html += `</tr>`
        }
    });
    fs.readFile('./templates/index.html','utf8',(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        data = data.replace('{list-user}',html);
        res.write(data);
        res.end()
    });
});

server.listen('3000',()=>{
    console.log('Server running port 3000')
})
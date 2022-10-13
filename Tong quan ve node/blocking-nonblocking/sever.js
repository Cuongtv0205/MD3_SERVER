
// Blocking: sum in sau nội dung tep
// const fs = require('fs');
// const filepath = 'text.txt';
// const data = fs.readFileSync(filepath, {encoding: 'utf8'});
// console.log(data);
//
// let sum = 0;
// for (let i = 1; i <= 10; i++) {
//     sum += i;
// }
// console.log('Sum: ', sum)

//Non-blocking: in trước nội dung tệp
const fs = require('fs');
const filepath = 'text.txt';
fs.readFile(filepath, {encoding: 'utf8'},(err,data)=>{
    console.log(data);
});
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log('Sum: ', sum)
const mysql = require('mysql');

class Connection {
    static configToMySQL = {  // Biết mình kết nối đến thằng nào và như thế nào
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'demo',
        charset : 'utf8_general_ci'
    }
    static getConnecting(){
        return mysql.createConnection(this.configToMySQL)
    }
     static connecting(){
        Connection.getConnecting().connect(error=>{
            if (error){
                console.log(error);
            }else {
                console.log('Connection Success!!');
            }
        })
     }
}

module.exports = Connection; // Ném thằng lớp ra làm đối tượng để tương tác
// Connection.connecting(); // Kiểm tra kết nối
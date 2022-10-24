const Connection = require('../model/connection');
Connection.connecting();

class CategoryService {
    static  getCategories() {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            // Truy vấn
            connection.query('SELECT * FROM category', (err,dataCategory) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dataCategory);
                }
            });
        })
    }
    static findByIdCategory(id){
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject)=>{
            connection.query(`select * from category where id = '${id}'`,(err,category)=>{
                if (err){
                    reject(err);
                }else {
                    console.log('---Category Success---');
                    resolve(category);
                }
            })
        })
    }
}
module.exports = CategoryService;
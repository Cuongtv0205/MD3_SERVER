const Connection = require('../model/connection');
Connection.connecting();

class ProductService {
    static getProducts() { // Lấy dữ liệu từ data
        let connection = Connection.getConnecting(); // Bắt thằng kết noi database
        return new Promise((resolve, reject) => {
            // Truy vấn
            connection.query('SELECT * FROM product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    static saveProduct(product) {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`insert into product (name, price, description,idCategory)
                              values ('${product.name}', ${product.price}, '${product.description}',${+product.idCategory})`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('---Create Success---')
                    resolve(products);
                }
            });
        })
    }

    static findById(id) {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from product
                              where id = '${id}'`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('---Create Success---')
                    resolve(products);
                }
            });
        })
    }

    static editProduct(product,id) {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`update product set name = '${product.name}', price = ${product.price},description = '${product.description}' where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('---Edit Success---')
                    resolve(products);
                }
            });
        })
    }

    static DeleteProduct(product,id) {
        let connection = Connection.getConnecting();
        return new Promise((resolve, reject) => {
            connection.query(`delete from product WHERE id = '${id}';`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('---Delete Success---')
                    resolve(products);
                }
            });
        })
    }
}

module.exports = ProductService;

// ProductService.getProducts(); // Lấy dữ liệu ra
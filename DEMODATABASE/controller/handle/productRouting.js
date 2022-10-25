const fs = require('fs');
const qs = require('qs');
const ProductService = require('C:\\Users\\HP.DESKTOP-35U4HVA\\WebstormProjects\\MD2_TH_03\\10\\MD3_BT_TH\\DEMODATABASE\\service\\productService.js');
const CategoryService = require('C:\\Users\\HP.DESKTOP-35U4HVA\\WebstormProjects\\MD2_TH_03\\10\\MD3_BT_TH\\DEMODATABASE\\service\\categoryService.js');
class ProductRouting {
    static async getHtmlProducts(products, indexHtml) {
        let tbody = '';
        let index = 1;
        for (const product of products){
            let category = await CategoryService.findByIdCategory(product.idCategory);
            tbody += `<tr style="text-align: center">
                <th scope="row">${index++}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${category[0].name}</td>
                <td><a href="/product/edit/${product.id}"class="btn btn-danger" >Edit</a></td>
                <td><a href="/product/delete/${product.id}"class="btn btn-danger">Delete</a></td>
            </tr>`
        }

    // static getHtmlProducts(products, indexHtml){
    //     let tbody = ``;
    //     products.map((product, index) => {
    //         tbody += `<tr style="text-align: center">
    //             <th scope="row">${index}</th>
    //             <td>${product.name}</td>
    //             <td>${product.price}</td>
    //             <td><a href="product/edit/${product.id}"class="btn btn-danger" >Edit</a></td>
    //             <td><a href="product/delete/${product.id}"class="btn btn-danger">Delete</a></td>
    //         </tr>`
    //     })
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await ProductService.getProducts(); // Biên dịch mảng products
                indexHtml = await ProductRouting.getHtmlProducts(products, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        })
    }

    static showFormCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/product/create.html', 'utf-8', async (err, dataCreatProductHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let categories = await CategoryService.getCategories();
                    let optionHtml = ``;
                    for (let i = 0; i < categories.length; i++) {
                        optionHtml += `<option value="${categories[i].id}">${categories[i].name}</option>`
                    }
                    dataCreatProductHtml = dataCreatProductHtml.replace('{categories', optionHtml);
                    res.writeHead(200, 'text/html');
                    res.write(dataCreatProductHtml);
                    res.end();
                }
            });
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk;
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);
                    // console.log(product);
                    await ProductService.saveProduct(product);
                    res.writeHead(301, {'location': '/home'});
                    res.end();// Lấy ra được dữ liệu và lưu về data(productService)
                }
            });
        }
    }

    static showFormEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/product/edit.html', 'utf-8', async (err, dataEditProductHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await ProductService.findById(id);
                    dataEditProductHtml = dataEditProductHtml.replace('{name}',product[0].name);
                    dataEditProductHtml = dataEditProductHtml.replace('{price}',product[0].price);
                    dataEditProductHtml = dataEditProductHtml.replace('{description}',product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(dataEditProductHtml);
                    res.end();
                }
            });
        }else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk;
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);
                    // console.log(product);
                    await ProductService.editProduct(product,id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();// Lấy ra được dữ liệu và lưu về data(productService)
                }
            });
        }
    }


    static showFormDelete(req, res,id) {
        if (req.method === 'GET') {
            fs.readFile('./views/product/delete.html', 'utf-8', async (err, dataDeleteProductHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await ProductService.findById(id);
                    dataDeleteProductHtml = dataDeleteProductHtml.replace('{name}',product[0].name);
                    dataDeleteProductHtml = dataDeleteProductHtml.replace('{price}',product[0].price);
                    dataDeleteProductHtml = dataDeleteProductHtml.replace('{description}',product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(dataDeleteProductHtml);
                    res.end();
                }
            });
        }else if(req.method === 'POST') {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk;
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);
                    await ProductService.DeleteProduct(product,id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();// Lấy ra được dữ liệu và lưu về data(productService)
                }
            });
        }
    }
}

module.exports = ProductRouting;

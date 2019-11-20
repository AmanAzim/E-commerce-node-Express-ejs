const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const filePath = path.join(
    path.dirname(process.mainModule.filename), //In the root directory
    'data', //in the data folder
    'products.json', //create a file name "product.json" and save data in json format
 );

const getProductsFromFile = callback => {

    fs.readFile(filePath, (err, fileContent) => { //REMINDER// the callback for readFile()/writeFile() are async so they will not return anything immedaitely
       if ( err ) {
           callback([]); //incase of err send empty array// means when there is no stored data
       } else {
           callback(JSON.parse(fileContent));
       }
    });
};

module.exports = class Product {

    constructor(id, title, imgUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            if ( this.id ) {

                const existingProductIndex = products.findIndex( product => product.id === this.id );
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;// the updated product
                fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                });

            } else {

                 this.id = Math.random().toString();
                 products.push(this); // This refers to the individual object created using the constructor function.
                 fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    console.log(err);
                 });
            }

        });
    }

    static fetchAll(callback) { //Static method can only be called directly using class name and not using class instance
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile((products) => {
            const selectedProduct = products.find( product => product.id === id );
            callback(selectedProduct);
        });
    }

    static deleteById(id) {
        getProductsFromFile((products) => {
            const productToDelete = products.find( product => product.id === id );
            const updatedProducts = products.filter( product => product.id !== id );

            fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {

               if ( !err ) {
                  Cart.deleteProductFromCart(id, productToDelete.price);
               } else {
                   console.log(err);
               }

            });
        });
    }
};
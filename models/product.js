const fs = require('fs');
const path = require('path');

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

    constructor(title, imgUrl, price, description) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        //products.push(this);// This refers to the individual object created using the constructor function.
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) { //Static method can only be called directly using class name and not using class instance
        getProductsFromFile(callback);
    }
};
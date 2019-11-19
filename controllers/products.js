const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add products',
        path: '/add-product'
    });
};

exports.postAddProducts = (req, res, next) => {
    const newProduct = new Product(req.body.title);
    newProduct.save();
    res.redirect('/');
};

exports.getDisplayProducts = (req, res, next) => {
    Product.fetchAll((products) => { //so that we only try to show products after it has been read from the storage anynchronously
        res.render('shop', {
            products: products,
            docTitle: 'shop',
        });// to render templates// send the data to the pug file
    });
};

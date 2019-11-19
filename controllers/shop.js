const Product = require('../models/product');

exports.getDisplayProducts = (req, res, next) => {
    Product.fetchAll((products) => { //so that we only try to show products after it has been read from the storage anynchronously
        res.render('shop/products-list', {
            products: products,
            docTitle: 'All Products',
            path: '/products-list',
        });// to render templates// send the data to the pug file
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => { //so that we only try to show products after it has been read from the storage anynchronously
        res.render('shop/index', {
            products: products,
            docTitle: 'Index',
            path: '/index',
        });// to render templates// send the data to the pug file
    });
};

exports.postAddToCart = (req, res, next) => {

};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Your Cart',
        path: '/cart'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Orders',
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    });
};
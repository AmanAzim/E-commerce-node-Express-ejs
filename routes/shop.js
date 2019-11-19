const express = require('express');
const path = require('path');
const routes = express.Router();

const adminData = require('./admin');

routes.get('/', (req, res, next) => {
    const products = adminData.products;

    res.render('shop', {
        products: products,
        docTitle: 'shop',
    });// to render templates// send the data to the pug file
});

module.exports = routes;
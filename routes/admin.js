const express = require('express');
const path = require('path');
const routes = express.Router();//makes the middleware exportable


const products = [];

routes.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add products',
        path: '/add-product'
    });
});

routes.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = routes;
exports.products = products;
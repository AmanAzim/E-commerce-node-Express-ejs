const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add products',
        path: '/add-product'
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    const newProduct = new Product(title, imgUrl, price, description);
    newProduct.save();

    res.redirect('/');
};

exports.getAdminProductsList = (req, res, next) => {
     Product.fetchAll((products) => { //so that we only try to show products after it has been read from the storage anynchronously
        res.render('admin/admin-products-list', {
            products: products,
            docTitle: 'Admin products list',
            path: 'admin/admin-products-list'
        });
    });
};

exports.getEditProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Edit products',
        path: 'admin/edit-product'
    });
};

exports.postDeleteProduct = (req, res, next) => {
    res.render('admin/delete-product', {
        docTitle: 'Edit products',
        path: 'admin/edit-product'
    });
};
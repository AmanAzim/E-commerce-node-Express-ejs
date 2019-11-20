const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add products',
        path: '/add-product',
        editing: false,
    });
};

exports.postAddProducts = (req, res, next) => {
    const id = null;
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    const newProduct = new Product(id, title, imgUrl, price, description);
    newProduct.save();

    res.redirect('/');
};

exports.getAdminProductsList = (req, res, next) => {
     Product.fetchAll((products) => { //so that we only try to show products after it has been read from the storage anynchronously
        res.render('admin/products-list', {
            products: products,
            docTitle: 'Admin products list',
            path: 'admin/products-list'
        });
    });
};

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if ( !editMode ) {
        return res.redirect('/');
    }

    Product.findById(req.params.productId, (product) => {
        if ( !product ) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            docTitle: 'Edit product',
            path: 'admin/edit-product',
            editing: editMode,
            product: product,
        });
    });

};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imgUrl;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(productId, updatedTitle, updatedImgUrl, updatedPrice, updatedDescription);
    updatedProduct.save();

    res.redirect('/admin/products-list');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products-list');
};
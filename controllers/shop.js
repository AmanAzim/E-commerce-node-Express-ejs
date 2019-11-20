const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getDisplayProducts = (req, res, next) => {
    Product.fetchAll((products) => { //so that we only try to show products after it has been read from the storage anynchronously
        res.render('shop/products-list', {
            products: products,
            docTitle: 'All Products',
            path: '/products-list',
        });// to render templates// send the data to the pug file
    });
};

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId; //Same name we have to extract that we have assigned in the route/shop => /products/:productId
    Product.findById(productId, (selectedProduct) => {
        res.render('shop/product-details', {
            docTitle: selectedProduct.title,
            product: selectedProduct,
            path: '/products-list',
        });
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

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProductsInfo = [];
            if ( cart.length !== 0 ) {
               for (product of products) {
               const cartProduct = cart.products.find( cartProduct => cartProduct.id === product.id );
                   if ( cartProduct ) {
                       cartProductsInfo.push({ product: product, quentity: cartProduct.quentity });
                   }
               }
            }

            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                cartProductsInfo: cartProductsInfo,
            });
        });
    });
};

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.deleteProductFromCart(productId, product.price);
    });
    res.redirect('/cart');
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
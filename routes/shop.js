const express = require('express');
const path = require('path');
const router = express.Router();

const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);

router.get('/products-list', shopController.getDisplayProducts);

router.post('/add-to-cart', shopController.postAddToCart);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
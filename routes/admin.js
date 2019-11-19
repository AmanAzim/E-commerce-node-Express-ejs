const express = require('express');
const router = express.Router();//makes the middleware exportable

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProducts);

router.post('/add-product', adminController.postAddProducts);

router.get('/admin-products-list', adminController.getAdminProductsList);

router.get('/edit-product', adminController.getEditProducts);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
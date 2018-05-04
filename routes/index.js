const express = require('express');
const cart = require('./cart.js');
const products = require('./products.js');
const users = require('./users.js');

const router = express.Router();

// router.use('/cart', cart);
router.use('/products', products); 
router.use('/users', users);

module.exports = router;
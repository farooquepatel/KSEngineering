const auth = require('../middleware/auth');
const express= require('express');
const router= express.Router();

const UserController = require('../Controller/UserController');
const productDetailsController = require('../Controller/productDetailsController');

// userController
router.post('/login', UserController.login);
router.post('/addUser', auth, UserController.addUser);
router.get('/getUserList', auth , UserController.getUserList);

//productDetailsController
router.post('/addProduct', auth , productDetailsController.addProduct);
router.get('/getProductList', auth, productDetailsController.getProductList);

module.exports=router;
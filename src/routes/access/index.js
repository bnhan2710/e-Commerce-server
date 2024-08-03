const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();


//Sign up
router.post('/shop/signup',asyncHandler(accessController.signUp));
//Sign in
router.post('/shop/login',asyncHandler(accessController.login));


//authentication





module.exports = router;
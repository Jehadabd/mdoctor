var express = require('express');
var router = express.Router();
const userController=require('../contollers/userController')
const { userValidatorRrules,validate}=require('../middlewares/validator')
const isLoggedIn=require('../middlewares/auth')
router.post('/account/signup',userValidatorRrules(),validate,userController.regoster)
router.post('/account/signin',userController.login)
router.get('/account/me',isLoggedIn,userController.me)
router.get('/account/serch',isLoggedIn,userController.getProfile)

module.exports = router;

const express=require('express');
const router=express.Router();
const authController=require('../Controllers/authController');
const {signupValidation,loginValidation}=require('../middlewares/inputValidationMiddleware')

router.post('/register',signupValidation,authController.registerUser);
router.post('/login',loginValidation,authController.loginUser);

module.exports=router;
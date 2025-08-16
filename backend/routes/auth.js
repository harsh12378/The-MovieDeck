const express=require('express');


const authController=require('../controllers/auth');

const authRouter=express.Router();

authRouter.post('/login',authController.postLogin);
//authRouter.post('/logout',authController.postLogout)

authRouter.post('/signup',authController.postSignup);

module.exports = authRouter




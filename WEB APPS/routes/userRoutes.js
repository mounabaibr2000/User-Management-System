const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/', userController.getLogin);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/home', userController.getHome);
router.get('/logout', userController.logout);


module.exports = router;

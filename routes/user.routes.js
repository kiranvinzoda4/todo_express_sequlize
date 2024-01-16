const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.get('/', verifyToken, userController.getAllUsers);

router.get('/:id', verifyToken, userController.getUserById);

router.put('/:id', verifyToken, userController.updateUserById);

router.delete('/:id', verifyToken, userController.deleteUserById);

module.exports = router;

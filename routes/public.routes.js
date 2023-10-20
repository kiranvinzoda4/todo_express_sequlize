const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Create a new user
router.post('/register', UserController.createUser);

// Retrieve all users
router.post('/login', UserController.login);

module.exports = router;

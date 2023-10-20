const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Create a new user
router.post('/create', UserController.createUser);

// Retrieve all users
router.get('/get-all', UserController.getAllUsers);

module.exports = router;

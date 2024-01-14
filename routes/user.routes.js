// routes/task.routes.js

const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../controllers/auth.controller');

const router = express.Router();

// Create a task
router.post('/', userController.createUser);

// Create a task
router.post('/login', userController.login);

// Get all tasks
router.get('/', verifyToken, userController.getAllUsers);

// Get a task by ID
router.get('/:id', verifyToken, userController.getUserById);

// Update a task by ID
router.put('/:id', verifyToken, userController.updateUserById);

// Delete a task by ID
router.delete('/:id', verifyToken, userController.deleteUserById);

module.exports = router;

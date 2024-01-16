// routes/task.routes.js

const express = require('express');
const todoController = require('../controllers/todo.controller');
const todoValidation = require('../validations/todo.validation');
const { verifyToken } = require('../controllers/auth.controller');

const router = express.Router();

// Get all tasks
router.post('/all', todoController.getAllTodosPaginated);

// Create a task
router.post('/', todoController.createTodo);

// Get all tasks
router.get('/', todoController.getAllTodos);


// Get a task by ID
router.get('/:id', todoController.getTodoById);

// Update a task by ID
router.put('/:id', todoController.updateTodoById);

// Delete a task by ID
router.delete('/:id', todoController.deleteTodoById);


module.exports = router;

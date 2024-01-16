const express = require('express');
const todoController = require('../controllers/todo.controller');
const todoValidation = require('../validations/todo.validation');
const { verifyToken } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/all', todoController.getAllTodosPaginated);

router.post('/', todoController.createTodo);

router.get('/', todoController.getAllTodos);

router.get('/:id', todoController.getTodoById);

router.put('/:id', todoController.updateTodoById);

router.delete('/:id', todoController.deleteTodoById);

router.post('/email/test', todoController.sendEmailTest);

router.post('/image-upload', todoController.uploadFile);

module.exports = router;

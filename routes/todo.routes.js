const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todo.controller');

router.post('/create', TodoController.createTodo);
router.get('/get-all', TodoController.getAllTodos);
router.put('/update/:todoId?', TodoController.updateTodo);
router.delete('/delete/:todoId?', TodoController.deleteTodo);

module.exports = router;

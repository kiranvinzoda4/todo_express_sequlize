const { Todo } = require('../models'); // Import your User model

// Create a new user
exports.createTodo = async (req, res) => {
    try {
        userId = req.user.id;
        const newUser = await Todo.create({ title: req.body.title, desc: req.body.desc, userId: userId });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', message: error.message });
    }
}

// Retrieve all users
exports.getAllTodos = async (req, res) => {
    try {
        const user_id = req.user.id;
        const todos = await Todo.findAll({
            where: {
                userId: user_id,
            },
        });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users', message: error.message });
    }
};

// Update a user by ID
exports.updateTodo = async (req, res) => {
    userId = req.user.id;
    const todoId = req.params.todoId;
    try {
        const [updatedCount] = await Todo.update(req.body, { where: { id: todoId } });
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Todo', message: error.message });
    }
};

// Delete a user by ID
exports.deleteTodo = async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const deletedCount = await User.destroy({ where: { id: todoId } });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo', message: error.message });
    }
};

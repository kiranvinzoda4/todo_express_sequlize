const { responseUser } = require('../responses/user.response.js');

const responseTodo = (todo) => {
    return {
        id: todo.id,
        name: todo.name,
        description: todo.description,
        isDeleted: todo.isDeleted,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
        user: responseUser(todo.User)
    };
};

module.exports = {
    responseTodo
};
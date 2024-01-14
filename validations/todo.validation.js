// validations/todo.validation.js
const Joi = require('joi');
const createTodoValidation = (data, res) => {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),

    }).unknown(true);

    const { error, value } = schema.validate(data);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        res.status(400).json({
            status: 400,
            message: `${errorMessage}`,
        });
        return res.end();
    }
    return true;
};

module.exports = {
    createTodoValidation,
};


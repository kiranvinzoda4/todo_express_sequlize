// validations/todo.validation.js
const Joi = require('joi');
const createUserValidation = (data, res) => {
    const schema = Joi.object({
        username: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
    }).unknown(true);

    const { error, value } = schema.validate(data);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({
            status: 400,
            message: `${errorMessage}`,
        }).end();
    }
    return true;
};

const UserLOginValidation = (data, res) => {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
    }).unknown(true);

    const { error, value } = schema.validate(data);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({
            status: 400,
            message: `${errorMessage}`,
        }).end();
    }
    return true;
};

module.exports = {
    createUserValidation,
    UserLOginValidation,
};


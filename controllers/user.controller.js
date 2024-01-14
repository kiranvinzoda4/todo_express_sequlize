const { User } = require('../models');
const { createUserValidation, UserLOginValidation } = require('../validations/user.validation');
const auth = require("./auth.controller");
const Joi = require("joi");
const { createRecord, allRecord, getRecordById, updateRecord, deleteRecord, getRecordByField } = require('./crud.js');

const createUser = async (req, res) => {
    try {
        createUserValidation(req.body, res);

        const pass = req.body.password;
        const encryptedPassword = await auth.generatePassword(pass);
        req.body.password = encryptedPassword;

        const user = await createRecord(User, req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        UserLOginValidation(req.body);
        const { email, password } = req.body;
        user_data = await getRecordByField(User, "email", email, res);
        if (user_data) {
            const test = await auth.comparePasswords(password, user_data.password);
            if (test) {
                delete user_data.password;
                const token = auth.getToken(JSON.parse(JSON.stringify(user_data)));
                res.json({
                    error: false,
                    message: "user data.",
                    data: { "token": token, "user": user_data },
                });
            } else {
                res.json({
                    error: false,
                    message: "Wrong password.",
                    data: [],
                });
            }
        } else {
            res.json({
                error: false,
                message: "Email is not found.",
                data: [],
            });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: true, message: "Something went wrong", data: e });
    }
    res.end();
};

const getAllUsers = async (req, res) => {
    try {
        const users = await allRecord(User);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getRecordById(User, userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        createUserValidation(req.body, res);
        const updatedUser = await updateRecord(User, userId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedRowCount = await deleteRecord(User, userId);
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
};

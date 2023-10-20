const { User } = require('../models'); // Import your User model
const auth = require("./auth");
// Create a new user
exports.createUser = async (req, res) => {
    try {
        const pass = req.body.password;
        const encryptedPassword = await auth.generatePassword(pass);
        req.body.password = encryptedPassword;
        const data = await User.create(req.body);
        if (data) {
            res.status(200).json({
                error: false,
                message: "User has been created",
                data: data,
            });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: true, message: "Something went wrong", data: e });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    user_data = await User.findOne({
        where: {
            email: email,
        },
    });
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
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users', message: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const [updatedCount] = await User.update({ name, email }, { where: { id } });
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', message: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await User.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', message: error.message });
    }
};

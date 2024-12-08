const user = require('../models/User');
const bcrypt = require('bcryptjs');
const {
  createdResponseMessage,
  successResponseMessage,
  errorResponseMessage,
} = require('../helpers/helpers');
const { sendUserCreationEmail } = require('../services/api/emailservice');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await user.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // const userPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = user.create({ name, email, password: hashedPassword, role });
        if (!createdUser) {
            errorResponseMessage(res, 'Error creating user');
        }
        await sendUserCreationEmail(req.body);

        createdResponseMessage(res, 'User created successfully');
    } catch (error) {
        errorResponseMessage(res, error.message);
        console.log("aaaaa",error);
    }
}
const fetchAllUsers = async (req, res) => {
    try {
        
        const allUsers = await user.findAll();
        successResponseMessage(
            res,
            'Users retrieved successfully',
            allUsers
        );
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
}
const getUserById = async (req, res) => {
    try {
        const userid = await user.findByPk(req.params.id);
        if (!userid) {
            notFoundResponseMessage(res, 'User not found');
        } else {
            successResponseMessage(res, 'User retrieved successfully', userid);
        }
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        await user.update(req.body, { where: { id: req.params.id } });
        successResponseMessage(res, 'User updated successfully');
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
}
const deleteUser = async (req, res) => {
    try {
        await user.destroy({ where: { id: req.params.id } });
        successResponseMessage(res, 'User deleted successfully');
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
}
module.exports = {
    createUser,
    getUsers: fetchAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
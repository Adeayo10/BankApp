const user = require('../models/User');
const {
  createdResponseMessage,
  successResponseMessage,
  errorResponseMessage,
} = require('../helpers/helpers');

const createUser = async (req, res) => {
    try {
        await user.create(req.body);
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
        const user = await user.findByPk(req.params.id);
        if (!user) {
            notFoundResponseMessage(res, 'User not found');
        } else {
            successResponseMessage(res, 'User retrieved successfully', user);
        }
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
}

module.exports = {
    createUser,
    getUsers: fetchAllUsers,
    getUserById,
};
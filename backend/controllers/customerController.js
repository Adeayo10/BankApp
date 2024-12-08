const customers = require("../models/customer");
const {
  createdResponseMessage,
  successResponseMessage,
  errorResponseMessage,
} = require("../helpers/helpers");
const { sendAccountCreationEmail } = require("../services/api/emailservice");
const createCustomer = async (req, res) => {
  try {
    const customer = await customers.create(req.body);
    if (!customer) {
      errorResponseMessage(res, "Error creating customer");
    }
    await sendAccountCreationEmail(req.body);
    createdResponseMessage(res, "Customer created successfully");
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};
const fetchAllCustomers = async (req, res) => {
  try {
    const allCustomers = await customers.findAll();
    successResponseMessage(
      res,
      "Customers retrieved successfully",
      allCustomers
    );
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};
const getCustomerById = async (req, res) => {
  try {
    const customer = await customers.findByPk(req.params.id);
    if (!customer) {
      notFoundResponseMessage(res, "Customer not found");
    } else {
      successResponseMessage(res, "Customer retrieved successfully", customer);
    }
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};
const updateCustomer = async (req, res) => {
  try {
    await customers.update(req.body, { where: { id: req.params.id } });
    successResponseMessage(res, "Customer updated successfully");
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await customers.destroy({ where: { id: req.params.id } });
    successResponseMessage(res, "Customer deleted successfully");
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

module.exports = {
  createCustomer,
  getCustomers: fetchAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

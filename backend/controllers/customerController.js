const customers = require('../models/customer');
const { createdResponseMessage, successResponseMessage, errorResponseMessage } = require('../helpers/helpers');

const createCustomer = async (req, res) => {
    try {
        
        await customers.create(req.body);
        createdResponseMessage(res, 'Customer created successfully');
       
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
};
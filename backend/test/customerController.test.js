const request = require('supertest');
const app = require('../app.js');
const sequelize = require('../config/database');
const User = require('../models/User');
const Customer = require('../models/customer');
const Transaction = require('../models/Transaction');
const generateTestToken = require('../controllers/loginController.js').generateTestToken;


let testToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  testToken = generateTestToken();
});

afterAll(async () => {
  await sequelize.close();
});

describe('Customer CRUD Operations', () => {
  let customerId;

  it('should create a new customer', async () => {
    const customer = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      dateOfBirth: '1990-01-01',
      accountType: 'savings',
      accountNumber: '1234567890',
      balance: 0,
    };

    const res = await request(app)
      .post('/customer/create')
      .set('Authorization', testToken)
      .send(customer);

    console.log('Response:', res.body); 

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Customer created successfully');
   
  });

  

  it('should fetch all customers', async () => {
    const res = await request(app)
      .get('/customer/all')
      .set('Authorization', testToken);

    console.log('Response:', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });


});
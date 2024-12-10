const request = require('supertest');
const app = require('../app.js');
const sequelize = require('../config/database');
const User = require('../models/User');
const Customer = require('../models/Customer');
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
      .send(customers);

    console.log('Response:', res.body); 

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Customer created successfully');
   
  });

  

  it('should fetch all customers', async () => {
    const res = await request(app)
      .get('/customer/all')
      .set('Authorization', testToken);

    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should fetch a customer by ID', async () => {
    const res = await request(app)
      .get(`/customer/1}`)
      .set('Authorization',testToken);

    console.log('Response:', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(typeof res.body.data).toBe('object');
  });

  it('should update a customer', async () => {
    const updatedCustomer = {
      name: 'John Doe Updated',
      email: 'johnupdated@example.com',
    };

    const res = await request(app)
      .put(`/customer/1`)
      .set('Authorization', testToken)
      .send(updatedCustomer);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Customer updated successfully');
  });

   it('should delete a customer', async () => {
     const res = await request(app)
       .delete(`/customer/1`)
       .set('Authorization', testToken);

     expect(res.status).toBe(200);
     expect(res.body).toHaveProperty('message', 'Customer deleted successfully');
   });
});
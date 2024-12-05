const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/database');
const customerRoute = require('./routes/customerRoute');

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/customer', customerRoute);

db.sync({ force: false }) // Set force to true to drop and recreate tables on every sync
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
  
module.exports = app;
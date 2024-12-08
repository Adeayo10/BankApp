const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/database');
const customerRoute = require('./routes/customerRoute');
const userRoute = require('./routes/userRoute');
const transactionRoute = require('./routes/transactionRoute');
const authRoute = require('./routes/authRoute');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/customer', customerRoute);
app.use('/user', userRoute);
app.use('/transaction', transactionRoute);
app.use('/auth', authRoute);

db.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = app;
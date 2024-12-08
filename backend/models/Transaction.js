// const {DataTypes} = require('sequelize');
// const db = require('../config/database');

// const Transaction = db.define('transaction', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     amount: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false
//     },
//     type: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     accountNumber: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// });
// module.exports = Transaction;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Transaction;
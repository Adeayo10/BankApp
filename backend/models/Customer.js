const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Customer = db.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false

    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    accountType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Customer;
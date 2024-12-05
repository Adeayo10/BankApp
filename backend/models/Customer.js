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
        allowNull: false
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
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

module.exports = Customer;
const Sequelize = require("sequelize");
const db = require("../db");
const { Landlord } = require('./Landlord');

const Tenant = db.define("tenant",{
    name: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    username:{
        type:Sequelize.STRING,
    },
    dateOfBirth: {
        type: Sequelize.STRING,
    },
    phoneNumber: {
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
    },
    rentPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    leaseStartDate: {
        type: Sequelize.STRING,
    },
    leaseEndDate: {
        type: Sequelize.DATE,

    },
    userId: {
        type: Sequelize.INTEGER,
    },
    idForTenantToAssociate: {
        type: Sequelize.INTEGER,
        references: {
        model: Landlord,
        key: 'id'

        },
    },
    unitIdToAssociateTenant: {
        type:Sequelize.INTEGER,
    },
    rentAmount: {
        type: Sequelize.INTEGER,
    },
})

module.exports = Tenant
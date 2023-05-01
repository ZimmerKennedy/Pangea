const Sequelize = require('sequelize')
const db = require('../db')
const Tenant = require('../models/Tenant')


const Payment = db.define("payment", {
    tenantId: {
      type: Sequelize.INTEGER,
      references: {
        model: Tenant,
        key: "id",
        as: "tenant"
      }
    },
    paymentDate: {
      type: Sequelize.DATE
    },paidAmount: {
        type: Sequelize.INTEGER,
      },
      paymentBy:{
        type: Sequelize.STRING,
      }
      
  });

  module.exports = Payment
  
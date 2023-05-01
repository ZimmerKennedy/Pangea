const Sequelize = require('sequelize')
const db = require('../db')
const Tenant = require('./Tenant')
const Payment = require('./Payment')


const PaymentHistory = db.define("paymentHistory", {
    paidAmount: {
      type: Sequelize.INTEGER,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
    paymentBy:{
      type: Sequelize.STRING,
    },
    unitNumber:{
      type:Sequelize.STRING,
    },
    tenantId: {
      type: Sequelize.INTEGER,
      references: {
        model: Tenant,
        key: "id",
        as: "tenant"
      }
    },
    paymentId: {
      type: Sequelize.INTEGER,
      references: {
        model: Payment,
        key: "id",
        as: "payment"
      }
    }
  });

  module.exports = PaymentHistory;
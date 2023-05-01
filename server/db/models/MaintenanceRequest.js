const Sequelize = require('sequelize')
const db = require('../db')

const MaintenanceRequest = db.define('maintenanceRequest', {
    type: {
      type: Sequelize.STRING,
    },
    severity: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    creationDate: {
      type: Sequelize.DATE,
    }
  })
  
  module.exports = MaintenanceRequest;
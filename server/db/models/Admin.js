const Sequelize = require('sequelize')
const db = require('../db')


const Admin = db.define('admin', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
    }
  })
  
  module.exports = Admin
const Sequelize = require("sequelize");
const db = require("../db");




const Unit = db.define('unit',{
    unitNumber: {
        type: Sequelize.INTEGER,
    },

    isOccupied: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    bedrooms: {
        type: Sequelize.INTEGER,
    },   
    propertyId: {
        type: Sequelize.INTEGER,
    } 
})  

module.exports = Unit;
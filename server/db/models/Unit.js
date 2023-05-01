const Sequelize = require("sequelize");
const db = require("../db");

const images = [
    'unit1.jpg',
    'unit2.jpg',
    'unit3.jpg',
    'unit4.jpg',
    'unit5.jpg',
    'unit6.jpg',
    'unit7.jpg',
    'unit8.jpg',
    'unit9.jpg',
    'unit10.jpg',
];

function selectRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }
const Unit = db.define('unit',{
    unitNumber: {
        type: Sequelize.INTEGER,
    },
    image:{
        type: Sequelize.STRING,
        defaultValue: selectRandomImage,
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
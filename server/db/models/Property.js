const Sequelize = require("sequelize");
const db = require("../db");


const images = [
    'property1.jpg',
    'property2.jpg',
    'property3.jpg',
    'property4.jpg',
    'property5.jpg',
    'property6.jpg',
    'property7.jpg',
    'property8.jpg',
    'property9.jpg',
    ];



function selectRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }
  
const Property = db.define('property',{
    propertyName : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numberOfUnits : {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    landlordId: {
        type: Sequelize.INTEGER,
    },
    image:{
            type: Sequelize.STRING,
            defaultValue: selectRandomImage,
        },
    pricePurchased: {
        type: Sequelize.INTEGER,
    },
    datePurchased: {
        type: Sequelize.DATE,
    },
    rentalAmount: {
        type: Sequelize.INTEGER,
    },
    mortgageExpense: {
        type: Sequelize.INTEGER,
    },
    currentMarketValue: {
        type: Sequelize.INTEGER,
    },
    hoaExpense: {
        type: Sequelize.INTEGER,
    },
    propertyTax: {
        type: Sequelize.INTEGER,
    },
    insuranceExpense: {
        type: Sequelize.INTEGER,
    },
    vacancyRate: {
        type: Sequelize.INTEGER,
    },
    repairsExpense: {
        type: Sequelize.INTEGER,
    },
    capRate: {
        type: Sequelize.INTEGER,
    },
    cashOnCashReturn: {
        type: Sequelize.INTEGER,
    },
    grossRentMultiplier: {
        type: Sequelize.INTEGER,
    },
    netOperatingIncome: {
        type: Sequelize.INTEGER,
    },
    grossIncome: {
        type: Sequelize.INTEGER,
    },
    cashFlow: {
        type: Sequelize.INTEGER,
    },
    totalExpenses: {
        type: Sequelize.INTEGER,
    },
    totalIncome: {
        type: Sequelize.INTEGER,
    },
    totalReturn: {
        type: Sequelize.INTEGER,
    },
})  

module.exports = Property
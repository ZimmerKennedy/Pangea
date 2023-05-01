const express = require("express");
const router = express.Router();
const PaymentHistory = require("../db/models/PaymentHistory")

// GET route to retrieve payment history
router.get('/', async (req, res) => {
    try {
      const paymentHistory = await PaymentHistory.findAll();
      res.json({ paymentHistory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving payment history.' });
    }
  });
  
  module.exports = router
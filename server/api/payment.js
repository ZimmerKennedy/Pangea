const express = require("express");
const router = express.Router();
const Payment = require("../db/models/Payment");
const Tenant = require("../db/models/Tenant");
const PaymentHistory = require("../db/models/PaymentHistory");
// Create a payment
router.post("/", async (req, res) => {
  try {
    console.log(`req.body`, req.body);
    const { tenantId, paymentDate, paidAmount, paymentBy, unitNumber } = req.body;
    const tenant = await Tenant.findByPk(tenantId).catch((error) => {
      console.error(error);
    });
    if (!tenant) {
      return res.status(400).send({ message: "Tenant not found" });
    }

    const payment = await Payment.create({
      tenantId,
      paymentDate,
      paidAmount,
      paymentBy,
    });

    // Update payment history
    await PaymentHistory.create({
      tenantId,
      paymentDate,
      paidAmount,
      paymentBy,
      paymentId: payment.id,
      unitNumber,
    });

    res.send({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating payment" });
  }
});

// Get all payments
router.get("/", (req, res) => {
  try {
    const payments = Payment.findAll();
    res.send(payments);
  } catch (err) {
    res.status(500).send({
      error: "An error occurred while retrieving payments",
    });
  }
});

module.exports = router;

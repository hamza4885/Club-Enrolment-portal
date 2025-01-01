const { processPayment, sendStripeApiKey }=require ("../Controllers/paymentController");

const express = require("express");


const router = express.Router();

router.post("/process", processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;

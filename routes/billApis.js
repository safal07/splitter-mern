const express = require('express');
const router = express.Router();
const sendMail = require('../email/sendMail');
const billTemplate = require('../email/billTemplate');
router.post('/sendBill', (req, res) => {
  sendMail(req.body.recieverEmail, "You owe something", billTemplate(req.body))
  .then((result) => {
      res.send("Bill sent");
      console.log(result);
    })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;

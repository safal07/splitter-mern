var router = require('express').Router();

let Ledger = require('../models/ledger');


//authenticate and send data
router.get('/ledger/:id', authenticate, (req, res) => {
  res.json({"all" : "good"});
});




router.get('/test', (req, res) => {
  console.log(req.session);
  res.send("hello people");
});



function authenticate(req, res, next) {
  if(req.isAuthenticated())
    return next();
  else {
    res.json(req.session);
  }
}

module.exports = router;

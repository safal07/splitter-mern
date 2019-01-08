var router = require('express').Router();

let Ledger = require('../models/ledger');


//authenticate and send data
router.get('/ledger', authenticate, (req, res) => {
  res.json(req.session);
});




router.get('/test', authenticate, (req, res) => {
  if(req.user)
    res.json(req.user);
  else
  res.json(req.session);
});


function authenticate(req, res, next) {
  if(req.isAuthenticated())
    return next();
  else {
    res.redirect('http://127.0.0.1:3000');
  }
}

module.exports = router;

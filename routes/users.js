const express = require('express');
const router = express.Router();

//Bring the user model
let User = require('../models/user');

router.get('/register', (req, res) => {
  User
  .findOne( { username : "safal07" } )
  .then (doc => res.json(doc)).
  catch(err => console.log(err));
});

module.exports = router;

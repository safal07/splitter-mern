const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ledgerSchema = new Schema({
  title : {type: String, required: true, unique: true},
  creator : {type: String, required: true}
});

var Ledger = mongoose.model('Ledger', ledgerSchema);

module.exports = Ledger;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ledgerSchema = new Schema({
  title : {type: String, required: true},
  creator : {type: Schema.ObjectId, ref: "User", required: true},
  members : [{type: Schema.ObjectId, ref: "User"}],
  created: {type: Date, default: Date.now()},
  entries: [{type: Schema.ObjectId, ref: 'Entry'}]
});

var Ledger = mongoose.model('Ledger', ledgerSchema);

module.exports = Ledger;

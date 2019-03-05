var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
  dateOfExpense: {type: Date},
  amountofExpense: {type: Number},
  descriptionOfExpense: {type: String},
  creator: {type: Schema.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now()},
  ledger: {type: Schema.ObjectId, ref: 'Ledger', require: true}
});


var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;

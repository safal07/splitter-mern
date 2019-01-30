var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
  date: {type: Date, required: true},
  amount: {type: Number, required: true},
  description: {type: String}
});


var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;

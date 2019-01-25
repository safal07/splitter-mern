var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  firstname: {type: String, require: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  ledgers: [{ type : Schema.ObjectId, ref: 'Ledger' }]
});


var User = mongoose.model('User', userSchema);

module.exports = User;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: {type: String, require: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  ledgers: [{
    id: String,
    title: String
  }]
});


var User = mongoose.model('User', userSchema);

module.exports = User;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entryScheme = new Scheme({
  user: {type: String, unique = true},
  isAdmin: Boolean
});


var Group = mongoose.model('Group', groupScheme);

module.exports = Group;

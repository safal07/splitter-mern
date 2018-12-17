var mongoose = require('mongoose');
var Scheme = mongoose.Scheme;

var groupScheme = new Scheme({
  user: {type: String, unique = true},
  isAdmin: Boolean
});


var Group = mongoose.model('Group', groupScheme);

module.exports = Group;

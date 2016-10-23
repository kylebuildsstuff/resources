var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define schema for our user model
var userSchema = mongoose.Schema({

  local: {
    email: String,
    password: String
  },
  boards: []

});

// Methods ====================================================================
// Generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

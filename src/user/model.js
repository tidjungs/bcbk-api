const mongoose = require('mongoose');  
const bcrypt   = require('bcrypt-nodejs');
const UserSchema = new mongoose.Schema({  
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

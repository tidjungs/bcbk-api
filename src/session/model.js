var mongoose = require('mongoose');  

var SessionSchema = new mongoose.Schema({  
  name: String,
  speaker: [String],
  start: Date,
  end: Date,
  room: String
});

mongoose.model('Session', SessionSchema);
module.exports = mongoose.model('Session');

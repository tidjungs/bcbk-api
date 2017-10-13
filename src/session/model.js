var mongoose = require('mongoose');  

var SessionSchema = new mongoose.Schema({  
  name: { type: String, required: true },
  speaker: { type: [String], required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  room: { type: String, required: true }
});

mongoose.model('Session', SessionSchema);
module.exports = mongoose.model('Session');

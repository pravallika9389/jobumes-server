var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Profile = require('./profile-model.js'),
    Role = require('./role-model.js');

var userSchema = Schema({
  uuid: {type: String, required: [true, 'user uuid is required']},
  timestamp: {type: Date, required: [true, 'user creation timestamp is required']},
  username: {type: String, required: [true, 'username is required']},
  password: {type: String, required: [true, 'username is required']}, // TODO: BCrypt hash that is stored here.
  // status - 'new user' (no email activation done),
  //          'registered' (email activation completed),
  //          'activated' (linked to a client profile),
  //          'deleted' (username marked as deleted)
  status: {type: String, required: [true, 'user\'s current status is required']},
  role: {type: String, ref: 'Role'}
});

exports.User = mongoose.model('User', userSchema);

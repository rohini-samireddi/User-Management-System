
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true },
});

module.exports = mongoose.model('Users', usersSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = new Schema(
  {
    name: String,
    genre: String,
    image: String,
    category: String,
    year: String,
  },
  { collection: 'users' }
);
const User = mongoose.model('users', usersSchema);
module.exports = User;

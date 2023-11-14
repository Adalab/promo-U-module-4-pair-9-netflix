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
  { collection: 'actors' }
);
const Actor = mongoose.model('actors', actorsSchema);
module.exports = Actor;
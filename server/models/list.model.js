const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   public: Boolean,
   movies: Array,
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
}, {collection: 'Lists'});


module.exports = mongoose.model('List', userSchema)
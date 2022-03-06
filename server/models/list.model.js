const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   public: Boolean,
   movies: Array,
}, {collection: 'Lists'});


module.exports = mongoose.model('List', userSchema)
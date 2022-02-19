const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   stats: {
       type: Object,
       totalQuestionsAnswerd: Number,
       correctAnswers: Number,
       incorrectAnswers: Number,
       longestStreak: Number
   }
}, {collection: 'Users'});


module.exports = mongoose.model('User', userSchema)
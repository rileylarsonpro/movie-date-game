const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   stats: {
       type: Object,
       totalQuestionsAnswered: { type: Number, default: 0 },
       correctAnswers: { type: Number, default: 0 },
       incorrectAnswers: { type: Number, default: 0 },
       currentStreak: { type: Number, default: 0 },
       longestStreak: { type: Number, default: 0 }
   }
}, {collection: 'Users'});


module.exports = mongoose.model('User', userSchema)
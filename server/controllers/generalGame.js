const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const {getRandomInt, formatQuestion} = require('../util')


module.exports = function () {
  return {
    async getQuestion(req, res) {
      try {
        Movie.countDocuments({}, async function (err, count) {
          let rand = getRandomInt(count)
          let movieToSend = await Movie.findOne().skip(rand)
          return res.status(200).send(formatQuestion(movieToSend, 3)) //TODO: make difficulty dynamic
        })
      } catch (err) {
        return res.status(500).send({ message: "Internal Server Error", error: err });
      }

    },

    async answerQuestion(req, res) {
      const {answer, correctAnswer} = req.body
      let user = await User.findById(req.user._id).exec();
      user.stats.totalQuestionsAnswered += 1
      if(answer === correctAnswer){
        user.stats.correctAnswers = user.stats.correctAnswers + 1
        user.stats.currentStreak = user.stats.currentStreak + 1
        if (user.stats.currentStreak >  user.stats.longestStreak){
          user.stats.longestStreak = user.stats.currentStreak
        }
      }
      else {
        user.stats.incorrectAnswers = user.stats.incorrectAnswers + 1
        user.stats.currentStreak = 0
      }
      let newUser = await User.findOneAndUpdate({_id: req.user._id}, {stats: user.stats})
      res.send(newUser)
    },

    async getPersonalStats(req, res) {
      let { userId } = req.enforcer.params
      let user = await User.findById(userId).exec();
      if (!user || !user.stats){
        res.enforcer.status(404).send()
      }
      else res.enforcer.send(user.stats)
    },

    async getLeaderboard(req, res) {
      // get just stats and username of all users
      let users = await User.find({}, {'_id': false, 'stats': true,  'username': true}).sort({'stats.correctAnswers' : -1}).exec();
      res.send(users)
    },

  }
}
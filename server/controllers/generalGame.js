const User = require('../models/user.model');
const Movie = require('../models/movie.model');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function formatQuestion(movie, difficulty) {
  if (difficulty < 2) {
    difficulty = 2
  }
  let question = { movieId: movie._id, title: movie.Title, correctAnswer: movie.Year }
  let numAnswers = 4 //TODO: Make this dynamic
  let years = new Array(numAnswers).fill(null)
  let randPostion = getRandomInt(numAnswers)
  years[randPostion] = movie.Year
  years.forEach((year, index) => {
    let plusOrMinus = getRandomInt(2)
    if (year === null) {
      let yearToAdd = 0
      if (plusOrMinus === 0) {
        yearToAdd = (movie.Year - getRandomInt(difficulty)) - 1
        // While answer is not unique 
        while (years.findIndex(year => year === yearToAdd) !== - 1) {
          yearToAdd = (yearToAdd - getRandomInt(difficulty)) - 1
        }
        years[index] = yearToAdd
      }
      else {
        yearToAdd = (movie.Year + getRandomInt(difficulty)) + 1
        while ((years.findIndex(year => year === yearToAdd) !== - 1)) { 
          yearToAdd = (yearToAdd + getRandomInt(difficulty)) + 1
        }
        years[index] = yearToAdd
      }
    }
  })
  question.answers = years
  return question
}


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


    },

    async getPersonalStats(req, res) {


    },

    async getLeaderboard(req, res) {


    },

  }
}
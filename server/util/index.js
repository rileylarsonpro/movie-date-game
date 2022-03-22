exports.getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
  
exports.formatQuestion = (movie, difficulty) => {
    if (difficulty < 2) {
      difficulty = 2
    }
    let question = { movieId: movie._id, title: movie.Title, correctAnswer: movie.Year }
    let numAnswers = 4 //TODO: Make this dynamic
    let years = new Array(numAnswers).fill(null)
    let randPostion = this.getRandomInt(numAnswers)
    years[randPostion] = movie.Year
    years.forEach((year, index) => {
      let plusOrMinus = this.getRandomInt(2)
      if (year === null) {
        let yearToAdd = 0
        if (plusOrMinus === 0) {
          yearToAdd = (movie.Year - this.getRandomInt(difficulty)) - 1
          // While answer is not unique 
          while (years.findIndex(year => year === yearToAdd) !== - 1) {
            yearToAdd = (yearToAdd - this.getRandomInt(difficulty)) - 1
          }
          years[index] = yearToAdd
        }
        else {
          yearToAdd = (movie.Year + this.getRandomInt(difficulty)) + 1
          while ((years.findIndex(year => year === yearToAdd) !== - 1)) { 
            yearToAdd = (yearToAdd + this.getRandomInt(difficulty)) + 1
          }
          years[index] = yearToAdd
        }
      }
    })
    question.answers = years
    return question
  }
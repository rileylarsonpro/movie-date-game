const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const List = require('../models/list.model');
const fs = require('fs');
const csvParser = require('fast-csv');

module.exports = function () {
  return {
    async uploadList (req, res) {
      // Update general game movie list
      if(req.body.name === process.env.ADMIN_PASSWORD){ 
        await Movie.deleteMany({}) // clear collection
        let stream = fs.createReadStream(req.file.path);
        stream
          .pipe(csvParser.parse({ headers: true }))
          .on('error', error => res.status(500).send(error))
          .on('data', async row =>  {
            let movie = new Movie(row)
            await movie.save()
          })
          .on('end', rowCount => {
            fs.unlinkSync(req.file.path)
            res.send(`Added ${rowCount} movies`)
          });
      } else {
        let list = new List({
          name: req.body.name,
          public: req.body.public
        })
        let movies = []
        let stream = fs.createReadStream(req.file.path);
        stream
          .pipe(csvParser.parse({ headers: true }))
          .on('error', error => res.status(500).send(error))
          .on('data', async row =>  {
            movies.push({row})
          })
          .on('end', async rowCount => {
            list.movies = movies
            let response = await list.save()
            fs.unlinkSync(req.file.path)
            res.send(response)
          });
      }
    },

    async updateList (req, res) {

      
    },

    async deleteList (req, res) {

      
    },

    async startMovieList (req, res) {

      
    },

    async answerListQuestion (req, res) {

      
    },

    async getPublicLists (req, res) {

      
    },

  }
}
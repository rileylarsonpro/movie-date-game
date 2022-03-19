const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const List = require('../models/list.model');
const fs = require('fs');
const csvParser = require('fast-csv');

module.exports = function () {
  return {
    async uploadList (req, res) {
      // Update general game movie list
      console.log("PUBLIC", req.body.public)
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
          public: req.body.public,
          owner: req.enforcer.params.userId
        })
        let movies = []
        let stream = fs.createReadStream(req.file.path);
        stream
          .pipe(csvParser.parse({ headers: true }))
          .on('error', error => res.status(500).send(error))
          .on('data', async row =>  {
            movies.push({...row})
          })
          .on('end', async rowCount => {
            list.movies = movies
            let response = await list.save()
            fs.unlinkSync(req.file.path)
            res.send(response)
          });
      }
    },

    async getUserLists (req, res){
      let lists = await List.find({ 'owner': req.user._id}).exec()
      res.send(lists)
    },

    async updateList (req, res) {
      const data = req.enforcer.body
      const { listId } = req.enforcer.params
      let list = await List.findById(listId, "owner name public");
      if (!list) res.status(404).send(`List with ID ${listId} does not exist.`)
      else if (list.owner.toString() !== req.user._id.toString()) res.status(401).send()
      else {
        // Use request body to update user
        if (data.public !== null || data.public !== undefined) {
          list.public = data.public
        }
        if (data.name) {
          list.name = data.name
        }
        let result = await list.save();
        res.status(200).send(result);
      }
      
    },

    async deleteList (req, res) {
      const { listId } = req.enforcer.params
      let list = await List.findById(listId).exec();
      if (list === null) res.status(404).send(`list with ID ${listId} does not exist.`)
      else {
        await List.deleteOne({ _id: listId })
        res.status(204).send()
      }
    },

    async startMovieList (req, res) {

      
    },

    async answerListQuestion (req, res) {

      
    },

    async getPublicLists (req, res) {

      
    },

  }
}
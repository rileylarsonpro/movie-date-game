const User = require('../models/user.model');
const bcrypt = require('bcrypt')

module.exports = function () {
  return {
    async createAccount (req, res){
      const salt = await bcrypt.genSalt(10)
      const { username, password } = req.enforcer.body
      const user = new User({
        username: username,
        password: await bcrypt.hash(password, salt)	
      });
      let result = await user.save()
			if (result._id) {
				res.set('location', '/api/users/' + result._id)
					.status(201)
					.send(result)
			} else {
				res.enforcer.status(500).send()
			}
    },

    async deleteAccount (req, res) {
			const { userId } = req.enforcer.params
      var user = await User.findById(userId).exec();
      if (!user) res.status(404).send(`User with ID ${userId} does not exist.`)
      else {
        await User.deleteOne({ _id: userId})
        res.enforcer.status(204).send("User Deleted")
      }
		},

	  async updateAccount (req, res) {
			const data = req.enforcer.body
			const { userId } = req.enforcer.params
      const salt = await bcrypt.genSalt(10)
      var user = await User.findById(userId).exec();
      if (!user) res.status(404).send(`User with ID ${userId} does not exist.`)
      else {
        // Use request body to update user
        if (data.username){
          user.username = data.username
        }
        if (data.password){
          //user.password = await bcrypt.hash(password, salt)	
          user.password = await bcrypt.hash(data.password, salt)	
        }
        var result = await user.save();
        res.status(200).send(result);
      }
      
		},
    async login (req, res) {

      
		},
    async logout (req, res) {
      
		},
  }
}
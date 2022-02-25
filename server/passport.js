const passport = require('passport')
var bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
// Require User model
const User = require('./models/user.model');

// This defines what will be in the session cookie
passport.serializeUser(function (user, done) {
  done(null, user)
})
// Find the user from the session and use result in callback function
passport.deserializeUser(async (user, done) => {
  try {
    done(null, user)
  } catch (error) {
    console.error(error)
    done(error.message)
  }
})

// Here you will set up a connection to Google using variables from your .env file
passport.use(new LocalStrategy(async (username, password, done) => {
    let user = await User.findOne({ username: username })
    if(user){
        if (bcrypt.compareSync(password, user.password)) { // password maches for username
            return done(null, user)
        }
    }
    return done(null, false)
}))

// Initilize Session storage in MongoDB
const initStore = session => {
  const MongoDbStore = require(`connect-mongodb-session`)(session)
  const store = new MongoDbStore({
    uri: process.env.MONGO_CONNECTION_STRING,
    collection: `Sessions`,
  }, err => {
    if (err) console.error(err)
    else console.log(`Session Store Initialized`)
  })
  store.on(`error`, console.error)
  return store
}

module.exports = initStore
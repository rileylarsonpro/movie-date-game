// Define App
const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')

// Connect to mongodb
require('./mongo.js');

const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

module.exports.app = app


// Define Server
const server = express()
const openapiPath = path.resolve(__dirname, '../openAPIDocumentation.yml')
const enforcerPromice = Enforcer(openapiPath)
const enforcerMiddleware = EnforcerMiddleware(enforcerPromice) 

// Define controllers
const Users = require('./controllers/users')
const GeneralGame = require('./controllers/generalGame')
const Lists = require('./controllers/lists')

server.use(bodyParser.json())

// Logging Requests
server.use((req, res, next) => {
    //console.log(req.method, req.path)
    next()
})

// Use openAPIEnforcer on all /server requests
server.use('/api/*', enforcerMiddleware.init({baseUrl: '/api'}))

// Put custom routes here
server.use("/api/*", enforcerMiddleware.route({
	accounts: Users(),
    generalGame: GeneralGame(),
    lists: Lists()
}));

// Use mock middleware 
server.use('/api/*', enforcerMiddleware.mock())


enforcerMiddleware.on('error', err => {
    console.error(err)
    process.exit(1)
}) 

// All other request are handled by NEXT
server.get('*', (req, res) => {
    return handle(req, res)
}) 

module.exports.server = server



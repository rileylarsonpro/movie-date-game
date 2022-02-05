// Define App
const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')

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


server.use(bodyParser.json())

// Logging Requests
server.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// Use openAPIEnforcer on all /server requests
server.use('/server/*', enforcerMiddleware.init({baseUrl: '/server'}))

// Put custom routes here

// Use mock middleware 
server.use('/server/*', enforcerMiddleware.mock())


enforcerMiddleware.on('error', err => {
    console.error(err)
    process.exit(1)
}) 

// All other request are handled by NEXT
server.get('*', (req, res) => {
    return handle(req, res)
}) 

module.exports.server = server



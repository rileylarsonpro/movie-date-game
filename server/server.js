// Define App
const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const multer = require('multer')
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

// Passport setup
const session = require('express-session')
const passport = require('passport')
const store = require(`./passport`)(session)
const cookieParser = require('cookie-parser')

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
// server.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

// Cookie setup
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // A day long cookie
    }
}

if (server.get('env') === 'production') {
    server.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
    sess.cookie.sameSite = 'none'
}

server.use(session(sess))
server.use(passport.initialize())
server.use(passport.session())


// Use openAPIEnforcer on all /server requests
server.use('/api/*', enforcerMiddleware.init({ baseUrl: '/api' }))


// Put custom routes here

server.use("/api/*", require('./middleware/authenticated'))

//! Use of Multer
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, __dirname + '/uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
// initialize the multer
const upload = multer({
    storage: storage,
})

// for uploading csv 
server.use("/api/lists/users/*", upload.single('csv'))

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



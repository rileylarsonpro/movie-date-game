/*const express = require('express')
const app = express()
const port = 1334

const cors = require(`cors`)

app.use(cors())
app.use(express.json())
app.use(express.text())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    const type = req.headers['content-type']
    if (type !== 'text/plain' && type !== 'application/json'){
        res.status(400).send("Unknown Content Type")
    }
    else {
        res.send(req.body)
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}) */

/*
TODO: New index.js
const app require('./server')
 app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
*/ 
const {server} = require('./server')
const port = 1334

async function run () {
  const app = await server()
  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}
run().catch(console.error)
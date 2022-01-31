const express = require('express')
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
})
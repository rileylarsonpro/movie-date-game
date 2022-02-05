const { app, server } = require('./server')
const port = 1334

app.prepare().then(() => {
  server.listen(port, (err) => {
      if (err) throw err
      console.log(`Ready on http://localhost:${port}`)
  })
})
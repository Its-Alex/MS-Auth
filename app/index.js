const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')y
const db = require('./utils/db.js')

global.config = JSON.parse(require('fs').readFileSync(require('path').resolve(require('path').dirname(__dirname), 'config.json'), 'UTF-8'))
const port = global.config.port || 3030

if (process.env.NODE_ENV === 'production') global.config.db.host = 'localhost'

db.connect(global.config.db)

require('./utils/passport.js')


app.use(cors())
app.use(bodyParser.urlencoded({extended: true, limit: '512kb'}))
app.use(bodyParser.json({limit: '5mb'}))
app.use(passport.initialize())

// Global api route
app.use('/', require('./routes/index.js'))

// 404 not found api response
app.use((req, res) => {
  res.status(404)
  res.json({
    success: false,
    error: 'URL not found'
  })
})

// Start web server
app.listen(port, () => {
  console.log('Start at ' + port)
})

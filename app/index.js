const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./utils/db.js')

global.config = JSON.parse(require('fs').readFileSync(require('path').resolve(require('path').dirname(__dirname), 'config.json'), 'UTF-8'))
const port = global.config.port || 3030

if (process.env.NODE_ENV === 'production') global.config.db.host = 'localhost'

db.connect(global.config.db)

require('./utils/passport.js')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE, HEAD")
  res.header("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept")
  next()
})
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

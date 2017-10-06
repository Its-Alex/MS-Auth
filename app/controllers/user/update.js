const isEmpty = require('validator/lib/isEmpty')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcryptjs')

const model = require('../../models/user.js')

function error (res, error, status) {
  res.status(status)
  res.json({
    success: false,
    error
  })
}

module.exports = (req, res) => {
  if (typeof req.body.username === 'string' && req.body.username.length <= 30 &&
  !isEmpty(req.body.username)) {
    req.user.username = req.body.username
  }

  if (typeof req.body.mail === 'string' && isEmail(req.body.mail)) {
    req.user.mail = req.body.mail.toLowerCase()
  }

  if (typeof req.body.mail_at === 'string' && isEmail(req.body.mail_at)) {
    req.user.mail_at = req.body.mail_at.toLowerCase()
  }

  if (typeof req.body.password === 'string' && req.body.password.length <= 60 &&
  !isEmpty(req.body.password)) {
    req.user.password = bcrypt.hashSync(req.body.password, 10)
  }

  model.updateUser(req.user).then(result => {
    console.log(result)
    res.json({success: true})
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}

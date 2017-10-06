const isEmpty = require('validator/lib/isEmpty')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

const model = require('../models/user.js')

function error (res, error, status) {
  res.status(status)
  res.json({
    success: false,
    error
  })
}

module.exports = (req, res) => {
  if (typeof req.body.username !== 'string' ||
  typeof req.body.mail !== 'string' || typeof req.body.firstName !== 'string' ||
  typeof req.body.newPassword !== 'string' ||
  typeof req.body.photo !== 'string') return error(res, 'Invalid fields', 400)

  if (isEmpty(req.body.username) || req.body.username.length > 30) {
    return error(res, 'Invalid username')
  }

  if (!isEmail(req.body.mail)) return error(res, 'Invalid mail', 403)
  req.body.mail = req.body.mail.toLowerCase()

  if (req.body.password !== req.body.newPassword) {
    return error(res, 'Password does not match', 403)
  }

  if (isEmpty(req.body.password) || req.body.password.length < 8 ||
  req.body.password.length > 60) {
    return error(res, 'Invalid password', 403)
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  req.body.id = uuid()

  model.getUserByMail(req.body.mail).then(results => {
    if (results.length !== 0) return error(res, 'Mail already exist', 403)
    model.addUser(req.body).then(results => {
      if (results.affectedRows === 1) {
        res.status(201)
        res.json({success: true})
      } else {
        console.log(results)
        return error(res, 'Internal server error', 500)
      }
    }).catch(err => {
      console.log(err)
      return error(res, 'Internal server error', 500)
    })
  }).catch(err => {
    console.log(err)
    return error(res, 'Internal server error', 500)
  })
}

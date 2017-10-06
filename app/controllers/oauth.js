const uuidv4 = require('uuid/v4')

const model = require('../models/user.js')

let getUserFromProfile = (profile) => {
  let user = {}
  user.id = uuidv4()
  user.mail = profile.emails[0].value.toLowerCase()
  if (profile.provider === '42') {
    user.id_42 = profile.id
    user.id_github = null
    user.username = profile.name.givenName + ' ' + profile.name.familyName
  } else if (profile.provider === 'github' || profile.provider === 'facebook') {
    if (profile.provider === 'github') user.id_github = profile.id
    if (profile.provider === 'facebook') user.id_facebook = profile.id
    user.username = profile.displayName
  }
  return (user)
}

module.exports = (accessToken, refreshToken, profile, cb) => {
  if (profile.provider === '42') {
    model.getUserByFortyTwo(profile.id).then(res => {
      if (res.length === 0) {
        model.getUserByMail(profile.emails[0].value).then(res => {
          if (res.length === 0) {
            let user = getUserFromProfile(profile)
            model.addUser(user).then(res => {
              cb(null, user)
            }).catch(err => cb(err))
          } else {
            cb(null, res[0])
          }
        })
      } else {
        cb(null, res[0])
      }
    }).catch(err => cb(err))
  } else if (profile.provider === 'github') {
    model.getUserByGithub(profile.id).then(res => {
      if (res.length === 0) {
        model.getUserByMail(profile.emails[0].value).then(res => {
          if (res.length === 0) {
            let user = getUserFromProfile(profile)
            model.addUser(user).then(res => {
              cb(null, user)
            }).catch(err => cb(err))
          } else {
            cb(null, res[0])
          }
        })
      } else {
        cb(null, res[0])
      }
    }).catch(err => cb(err))
  } else if (profile.provider === 'facebook') {
    model.getUserByGithub(profile.id).then(res => {
      if (res.length === 0) {
        model.getUserByMail(profile.emails[0].value).then(res => {
          if (res.length === 0) {
            let user = getUserFromProfile(profile)
            model.addUser(user).then(res => {
              cb(null, user)
            }).catch(err => cb(err))
          } else {
            cb(null, res[0])
          }
        })
      } else {
        cb(null, res[0])
      }
    }).catch(err => cb(err))
  }
}

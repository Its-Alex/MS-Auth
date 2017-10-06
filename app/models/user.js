const db = require('../utils/db.js')

module.exports = {
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  getUserByMail: (mail) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM users WHERE mail = ?', [mail], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  getUserByFortyTwo: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM users WHERE id_42 = ?', [id], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  getUserByGithub: (id) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM users WHERE id_github = ?', [id], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('SELECT * FROM users INNER JOIN tokens ON users.id = tokens.userId WHERE tokens.token = ?', [token], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  addUser: (user) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('INSERT INTO users (id, mail, username, password, id_42, id_github, id_facebook, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
          user.id,
          user.mail,
          user.username,
          user.password,
          user.id_42,
          user.id_github,
          user.id_facebook,
          Date.now()
        ], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  },
  updateUser: (user) => {
    return new Promise((resolve, reject) => {
      db.get().then(db => {
        db.query('UPDATE users SET mail = ?, mail_at = ?, username = ?, password = ? WHERE id = ?', [
          user.mail,
          user.mail_at,
          user.username,
          user.password,
          user.id
        ], (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
      }).catch(err => reject(err))
    })
  }
}

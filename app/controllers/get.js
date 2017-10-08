module.exports = (req, res) => {
  delete req.user.password
  delete req.user.scope
  res.json({
    success: true,
    user: req.user
  })
}

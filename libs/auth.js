const jwt = require('jsonwebtoken')
const secret = require('./env').SECRET_TOKEN
const User = require('../models/user')

module.exports = async function({ req }) {
  let token = null
  let currentUser = null

  token = req.headers['authorization']
  if (!token) return

  const decodedInfo = jwt.verify(token, secret)

  if (token && decodedInfo) {
    currentUser = User.findById(decodedInfo.id)
    if (!currentUser) throw new Error('Invalid token')
  }

  return {
    token,
    currentUser
  }
}
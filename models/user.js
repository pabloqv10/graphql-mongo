const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../libs/env').SECRET_TOKEN

const userSchema = mongoose.Schema({
  email: String,
  hashedPassword: {
    type: String,
    // required: true
  },
  token: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
})

userSchema.virtual('password')

userSchema.pre('save', async function () {
  if (this.password === undefined) return

  try {
    const hash = await bcrypt.hash(this.password, 10)
    this.hashedPassword = hash
  } catch (err) {
    console.log(err)
    throw err
  }
})

// User.authenticate()
userSchema.statics.authenticate = async function ({email, password}) {
  const user = await this.findOne({email})

  const result = await bcrypt.compare(password, user.hashedPassword)

  if (!result) throw new Error('Email or password are wrong')

  // JSON WEB TOKENS (JWT)
  user.token = jwt.sign({ id: user.id }, secret)
  await user.save()

  return user
}

module.exports = mongoose.model('User', userSchema)
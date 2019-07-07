const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', userSchema)
const User = require('../models/user')
const Course = require('../models/course')

module.exports = {
  Query: {
    async getUsers() {
      return await User.find().populate('courses')
    },
    async getUser(obj, {id}) {
      return await User.findById(id)
    }
  },
  Mutation: {
    async signUp(obj, {input}) {
      const user = new User(input)
      await user.save()
      return user
    }
  },
  User: {
    async courses(u) {
      return await Course.find({user: u._id})
    }
  }
}
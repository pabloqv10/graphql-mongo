module.exports = `
type User{
  id: String
  email: String
  hashedPassword: String
  token: String,
  courses: [Course]
}

extend type Query{
  getUsers: [User]
  getUser(id: ID!): User
}

input userInput{
  email: String!
  password: String
}

extend type Mutation{
  signUp(input: userInput): User
  logIn(input: userInput): User
  signOut: Alert
}
`
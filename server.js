const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const { ApolloServer } = require('apollo-server-express')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')

const courseTypesDef = require('./types/course.types')
const userTypesDef = require('./types/user.types')

const courseResolvers = require('./resolvers/course.resolvers')
const userResolvers = require('./resolvers/user.resolvers')

const authFunc = require('./libs/auth')

mongoose.connect('mongodb://localhost/graphql_db_course', {useNewUrlParser : true})

const app = express()

app.use(cors())

const typeDefs = `
type Alert{
  message: String
}
type Query{
  _ : Boolean
}
type Mutation {
  _ : Boolean
}
`

const resolvers = {}

/*const schema = makeExecutableSchema({
  typeDefs: [typeDefs, courseTypesDef, userTypesDef],
  resolvers: merge(resolvers, courseResolvers, userResolvers)
})*/

const server = new ApolloServer({
  typeDefs: [typeDefs, courseTypesDef, userTypesDef],
  resolvers: merge(resolvers, courseResolvers, userResolvers),
  context: authFunc
})

/*app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}))

app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))*/

server.applyMiddleware({app})

app.listen(3000, () => console.log(`Sever running on http://localhost:3000`))


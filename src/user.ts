import { buildSubgraphSchema } from '@apollo/federation'
import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type User @key(fields: "id") {
    id: Int!
    name: String!
  }

  type Query {
    users: [User]
  }
`

const users = [
  { id: 1, name: 'taro' },
  { id: 2, name: 'jiro' },
]

const resolvers = {
  Query: {
    users: () => users,
  },

  User: {
    __resolveReference(user: any) {
      return users.find((u) => u.id === user.id)
    },
  },
}

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

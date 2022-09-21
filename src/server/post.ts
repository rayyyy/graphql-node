import { buildSubgraphSchema } from '@apollo/federation'
import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Post {
    id: Int
    title: String
    content: String
    user: User
  }

  type Query {
    posts: [Post]
  }

  extend type User @key(fields: "id") {
    id: Int! @external
  }
`

const posts = [
  { id: 1, title: 'foo', content: 'foooo', user: { id: 1 } },
  { id: 2, title: 'bar', content: 'baaaa', user: { id: 2 } },
  { id: 3, title: 'baz', content: 'bazzz', user: { id: 1 } },
]

const resolvers = {
  Query: {
    posts: () => posts,
  },

  Post: {
    user(post: any) {
      return { __typename: 'User', id: post.user.id }
    },
  },
}

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

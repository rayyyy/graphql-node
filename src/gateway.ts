import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'posts', url: 'http://localhost:4001/graphql' },
      { name: 'users', url: 'http://localhost:4002/graphql' },
    ],
  }),
})

const server = new ApolloServer({ gateway })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})

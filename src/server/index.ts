import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server'
import { join } from 'path'
import { Book, Resolvers } from '../types/generated/graphql'

const books: Book[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    custom_field: 'hoge',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    custom_field: 'fuga',
  },
]

const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
}

const schema = loadSchemaSync(join(__dirname, '../../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const server = new ApolloServer({
  schema: schemaWithResolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

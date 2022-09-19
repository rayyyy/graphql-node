import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  """
  Book type
  """
  type Book {
    title: String
    author: String
    """
    title and author
    """
    custom_field: String
  }

  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
  Book: {
    custom_field: (book: any) => book.title + book.author,
    title: (book: any) => book.title + 'hoge',
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../types/generated/graphql'

const graphQLClient = new GraphQLClient('http://localhost:4000/graphql')
const client = getSdk(graphQLClient)
client.getBooks().then((data) => {
  console.log(data.books)
})

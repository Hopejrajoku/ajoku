import { gql, GraphQLClient } from 'graphql-request'

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT // Add in .env

const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT)

const GET_BUSINESS_BY_CATEGORY_NAME = gql`
  query GetBusinessByCategoryName($name: String!) {
    businessLists(where: { category: { name: $name } }) {
      id
      name
      about
      address
      contactPerson
      email
      images {
        url
      }
      category {
        name
      }
    }
  }
`

export default async function getBusinessByCategoryName(name) {
  const variables = { name }
  const data = await graphQLClient.request(GET_BUSINESS_BY_CATEGORY_NAME, variables)
  return data.businessLists
}

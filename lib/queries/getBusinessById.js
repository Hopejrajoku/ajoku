import { gql, GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY // or whatever your endpoint is

const graphQLClient = new GraphQLClient(endpoint)

const query = gql`
  query GetBusinessById($id: ID!) {
    businessList(where: { id: $id }) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
`

export default async function getBusinessById(id) {
  try {
    const data = await graphQLClient.request(query, { id })

    // If businessList is an array, return the first result
    return data.businessList?.[0] || null
  } catch (error) {
    console.error('Error fetching business:', error)
    return null
  }
}

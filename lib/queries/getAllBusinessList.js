import { gql, GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY

const graphQLClient = new GraphQLClient(endpoint)

// Fetches all businesses from GraphCMS
export const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
        businessLists (first: 100) {
          about
          address
          category {
            name
          }
          contactPerson
          email
          images {
            url
          }
          id
          name
        }
      }
  `

  try {
    const data = await graphQLClient.request(query)
    return data.businessLists
  } catch (error) {
    console.error("Error fetching business list:", error)
    return []
  }
}

export default getAllBusinessList
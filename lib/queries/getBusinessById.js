import { gql, GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY;

const graphQLClient = new GraphQLClient(endpoint);

// Fetch a business by dynamic ID
const getBusinessById = async (id) => {
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
        price
        images {
          url
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query, { id });
    return data.businessList || null;
  } catch (error) {
    console.error('Error fetching business by ID:', error);
    return null;
  }
};

export default getBusinessById;

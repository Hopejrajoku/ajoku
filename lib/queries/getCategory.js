// lib/queries/getCategory.js
import { gql, GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY;

const graphQLClient = new GraphQLClient(endpoint);

const getCategory = async () => {
  const query = gql`
    query Category {
  categories {
    bgcolor {
      hex
    }
    id
    slug
    name
    icon {
      url
    }
  }
}
  `;

  try {
    const data = await graphQLClient.request(query);
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};



export default getCategory;

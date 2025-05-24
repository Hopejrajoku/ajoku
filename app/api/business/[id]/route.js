import { NextResponse } from 'next/server';
import { gql, GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY;

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
`;

export async function GET(request, context) {
  const id = `context?.params?.id`;

  if (!id) {
    return NextResponse.json({ error: 'Missing business ID' }, { status: 400 });
  }

  const graphQLClient = new GraphQLClient(endpoint);

  try {
    const data = await graphQLClient.request(query, { id });
    const business = data.businessList?.id ;

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error('Failed to fetch business:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

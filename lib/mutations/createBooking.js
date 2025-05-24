// lib/mutations/createBooking.js
import { gql, GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY;
const graphQLClient = new GraphQLClient(endpoint);

const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking($data: BookingCreateInput!) {
    createBooking(data: $data) {
      id
    }
  }
`;

const createBooking = async ({ businessId, date, time, userName, userEmail }) => {
  try {
    const response = await graphQLClient.request(CREATE_BOOKING_MUTATION, {
      data: {
        bookingStatus: 'booked',
        business: { connect: { id: businessId } },
        date,
        time,
        userName,
        userEmail,
      },
    });
    return response;
  } catch (error) {
    console.error('Booking creation failed:', error);
    throw error;
  }
};

export default createBooking;

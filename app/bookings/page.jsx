'use client';

import { useEffect, useState } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import { BsDot } from 'react-icons/bs';

const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY;
const graphQLClient = new GraphQLClient(endpoint);

const BOOKINGS_QUERY = gql`
  query BookingsByEmail($email: String!) {
    bookings(where: { userEmail: $email }) {
      id
      bookingStatus
      date
      time
      businessList {
        id
        name
        address
        contactPerson
        category {
          name
        }
        images {
          url
        }
      }
    }
  }
`;

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      setError('User email not found. Please log in or book an appointment first.');
      setLoading(false);
      return;
    }

    graphQLClient
      .request(BOOKINGS_QUERY, { email: userEmail })
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('GraphQL fetch error:', err);
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const upcoming = bookings.filter((b) => b.bookingStatus === 'booked');
  const completed = bookings.filter((b) => b.bookingStatus === 'completed');

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const renderBookingItem = ({ id, date, time, businessList }, status) => {
    const business = businessList;
    const imgUrl =
      business?.images?.url || 'https://placehold.co/100x100?text=No+Image';

    return (
      <li key={id} className="flex gap-4 border rounded p-3 items-center">
        <div className="relative w-40 h-40 flex-shrink-0 rounded overflow-hidden border">
          <Image
            src={imgUrl}
            alt={business?.name || 'Business'}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <strong className="text-lg text-gray-800">
            {business?.name || 'Service'}</strong>
          <p className="mt-1">
            {status === 'booked' ? 'On' : 'Completed on'} {formatDate(date)} at {time}
          </p>
          {business?.category?.name && (
            <p className="text-sm text-purple-700 bg-purple-100 rounded px-2 inline-block mt-1">
                {business.category.name}</p>
          )}
          {business?.contactPerson && (
            <p className="text-sm text-gray-600 flex items-center mt-1">
                <BsDot className="text-green-500 text-3xl animate-ping-slow" /> 
                {business.contactPerson}</p>
          )}
          {business?.address && (
            <p className="text-sm text-gray-600">{business.address}</p>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 font-sans space-y-10">
      <section style={{ fontFamily: 'var(--font-sf-pro)' }}>
        <h2 className="text-2xl font-bold mb-4 gradient gradient-title">Upcoming Booked Appointments</h2>
        {upcoming.length === 0 ? (
          <p>No upcoming appointments booked.</p>
        ) : (
          <ul className="space-y-4">
            {upcoming.map((booking) => renderBookingItem(booking, 'booked'))}
          </ul>
        )}
      </section>

      <section style={{ fontFamily: 'var(--font-sf-pro)' }}>
        <h2 className="text-2xl font-bold mb-4 gradient gradient-title">Completed Services</h2>
        {completed.length === 0 ? (
          <p>No completed services found.</p>
        ) : (
          <ul className="space-y-4">
            {completed.map((booking) => renderBookingItem(booking, 'completed'))}
          </ul>
        )}
      </section>
    </div>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import getBusinessById from '@/lib/queries/getBusinessById';
import Image from 'next/image';
import { Clock, MapPin, Notebook } from 'lucide-react';
import { BsDot } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import { gql, GraphQLClient } from 'graphql-request';

export default function BusinessPage() {
  const { id } = useParams();

  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = process.env.NEXT_PUBLIC_MASTER_URL_KEY;
  const graphQLClient = new GraphQLClient(endpoint);

  const CREATE_BOOKING_MUTATION = gql`
    mutation CreateBooking($data: BookingCreateInput!) {
      createBooking(data: $data) {
        id
      }
    }
  `;

  async function handleConfirmAppointment() {
  if (!date || !selectedSlot) {
    alert('Please select date and time slot');
    return;
  }

  const userEmail = localStorage.getItem('userEmail') || prompt('Please enter your email address:');
  const userName = localStorage.getItem('userName') || prompt('Please enter your name:');
  const userMobile = localStorage.getItem('userMobile') || prompt('Please enter your mobile number:');
  const houseAddress = localStorage.getItem('houseAddress') || prompt('Please enter your house address:');

  if (!userEmail || !userName || !userMobile || !houseAddress) {
    alert('Email, name, mobile number, and house address are required to book an appointment.');
    return;
  }

  try {
    const { createBooking } = await graphQLClient.request(CREATE_BOOKING_MUTATION, {
      data: {
        bookingStatus: 'booked',
        businessList: { connect: { id: business.id } },
        date: format(date, 'yyyy-MMM-dd'),
        time: selectedSlot,
        userEmail,
        userName,
        userMobile,
        houseAddress,
      },
    });

    const bookingId = createBooking.id;

    // Auto-publish the booking
    const PUBLISH_BOOKING_MUTATION = gql`
      mutation PublishBooking($id: ID!) {
        publishBooking(where: { id: $id }) {
          id
        }
      }
    `;

    await graphQLClient.request(PUBLISH_BOOKING_MUTATION, { id: bookingId });

    alert('Booking confirmed! You will receive a Phone call from ADMIN shortly on the Phone number you submitted.');

    setShowCalendar(false);
    setDate(null);
    setSelectedSlot(null);
  } catch (error) {
    console.error('Booking error:', error);
    alert('Failed to book appointment. Please try again later.');
  }
}


  useEffect(() => {
    if (!id) return;

    const fetchBusiness = async () => {
      setLoading(true);
      const result = await getBusinessById(decodeURIComponent(id));
      setBusiness(result);
      setLoading(false);
    };

    fetchBusiness();
  }, [id]);

  const getTimeSlots = (date) => {
    if (!date) return [];
    return [
      '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
      '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
    ];
  };

  useEffect(() => {
    if (date) {
      const slots = getTimeSlots(date);
      setTimeSlots(slots);
      setSelectedSlot(null);
    }
  }, [date]);

  if (loading) return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;
  if (!business) return <p className="text-center mt-20 text-lg text-red-600">Business not found.</p>;

  const imageUrl = business.images?.url || 'https://placehold.co/200x200?text=No+Image';

  return (
    <div className="max-w-2xl mx-auto p-6 mt-32 bg-white rounded-lg shadow-md" style={{ fontFamily: 'var(--font-sf-pro)' }}>
      <div className="gap-5 mb-6 justify-center items-center flex flex-col sm:flex-row">
        <div className="w-52 h-52 relative rounded-full overflow-hidden border shadow-md">
          <Image src={imageUrl} alt={business.name} fill className="object-cover" unoptimized priority />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold gradient gradient-title">{business.name}</h1>
          <p className="text-[#BF7B66] bg-purple-100 px-2 py-1 inline-block rounded-[4px] sm:text-sm md:text-base lg:text-lg">
            {business.category?.name || 'Uncategorized'}
          </p>
          <p className="flex items-center gap-2 pt-2">
            <Clock className="w-5 h-5 text-[#BF7B66]" />
            Available 08:00 AM - 10:00 PM
          </p>
        </div>
      </div>

      <div className="border border-[#BF7B66] p-4 rounded-md mb-6">
        <p className="mb-6 text-gray-700">{business.about}</p>
      </div>

      <div className="space-y-4 text-gray-800 mb-10">
        <p className="font-medium flex items-center gap-1">
          <BsDot className="text-green-500 text-3xl animate-ping-slow" />
          {business.contactPerson || 'N/A'}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#BF7B66]" />
          <span>{business.address || 'N/A'}</span>
        </p>

        <Sheet open={showCalendar} onOpenChange={setShowCalendar}>
          <SheetTrigger asChild>
            <Button 
            variant="look"
            className="w-full text-sm px-4 py-2 rounded-md transition" style={{ fontFamily: 'var(--font-sf-pro)' }}>
              <Notebook className="w-5 h-5 mr-2" />
              {date && selectedSlot
                ? `${format(date, 'yyyy-MMM-dd')} @ ${selectedSlot}`
                : 'Book Appointment'}
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="h-full p-6 flex flex-col items-center overflow-auto">
            <SheetHeader>
              <SheetTitle className="text-center text-2xl font-bold gradient gradient-title">
                Select An Appointment Date
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 w-full flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                }}
                initialFocus
                classNames={{
                  day_selected: 'bg-[#BF7B66] text-white hover:bg-[#BF7B66] focus:bg-[#BF7B66]',
                  day_today: 'border border-[#BF7B66]',
                }}
              />
            </div>

            {date && (
              <div className="mt-8 w-full">
                <h2 className="text-lg font-semibold mb-4 text-center gradient gradient-title">Available Time Slots</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.length > 0 ? (
                    timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-4 rounded-md text-sm border ${
                          selectedSlot === slot
                            ? 'bg-[#BF7B66] text-white border-[#BF7B66] '
                            : 'border-gray-300 hover:bg-[#A0522D] hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="text-center col-span-full text-gray-500">No slots available</p>
                  )}
                </div>
              </div>
            )}

            {selectedSlot && (
              <>
                <div className="mt-8 text-center text-sm gradient gradient-title font-medium">
                  Selected: {format(date, 'yyyy-MMM-dd')} at {selectedSlot}
                </div>

                <div className="mt-6 w-full space-y-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    defaultValue={localStorage.getItem('userEmail') || ''}
                    onChange={(e) => localStorage.setItem('userEmail', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF7B66] focus:ring-opacity-50"
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    defaultValue={localStorage.getItem('userName') || ''}
                    onChange={(e) => localStorage.setItem('userName', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF7B66] focus:ring-opacity-50"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    defaultValue={localStorage.getItem('userMobile') || ''}
                    onChange={(e) => localStorage.setItem('userMobile', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF7B66] focus:ring-opacity-50"
                  />
                  <input
                    type="text"
                    placeholder="House Address"
                    defaultValue={localStorage.getItem('houseAddress') || ''}
                    onChange={(e) => localStorage.setItem('houseAddress', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF7B66] focus:ring-opacity-50"
                  />
                </div>

                <Button
                  onClick={handleConfirmAppointment}
                  disabled={!date || !selectedSlot}
                  variant="look"
                  className="mt-6 w-[70%] hover:bg-purple-700 disabled:opacity-50"
                >
                  Confirm Appointment
                </Button>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}


import { auth } from '@/lib/auth';
import { Calendar, Eye, Tag, Trash2 } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import BookingButtons from '../Components/my-booking/BookingButtons';

const Mybookings = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const User = session?.user;

    // Safety check for session
    if (!User) return <div className="pt-40 text-center">Please login to view bookings.</div>;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${User.id}`, {
        cache: 'no-store'
    })
    const data = await res.json()


    const hadlebooking_del=()=>{

    }

    return (
        <div className="container mx-auto p-8 bg-white min-h-screen mt-20">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-gray-500 mt-2 text-lg">Manage and view your upcoming travel plans</p>
            </div>

            {/* Bookings List */}
            <div className="space-y-6">
                {data?.map((booking) => (
                    <div
                        key={booking._id}
                        className="flex flex-col md:flex-row border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Image Sidebar - Fixed Height for Mobile Visibility */}
                        <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0">
                            <Image
                                fill
                                src={booking.des_img}
                                alt={booking.des_name}
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Details Area */}
                        <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                                        <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
                                        Confirmed
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{booking.des_name}</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <span className="font-medium text-gray-500">Departure:</span>
                                        <span className="ml-1 text-gray-900">
                                            {new Date(booking.departureDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2 text-gray-400" />
                                        <span className="font-medium text-gray-500">Booking ID:</span>
                                        <span className="ml-1 text-gray-900 font-mono uppercase">{booking._id.slice(-8)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row: Pricing and Actions */}
                            <BookingButtons booking={booking}></BookingButtons>
                          
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg font-medium">You don&lsquo;t have any travel bookings yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mybookings;
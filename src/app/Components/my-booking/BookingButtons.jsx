'use client'
import { AlertDialog, Button } from '@heroui/react';

import { Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';

const BookingButtons = ({booking}) => {
    const route=useRouter()

    const handlebooking_del=async(id)=>{
const res=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${booking._id}`,{
    method:"DELETE",
    headers:{
        'content-type': 'application/json'
    },
})
const data= await res.json();
route.refresh()
    }
    
    return (
  <div className="mt-6 pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-baseline">
                <span className="text-3xl font-extrabold text-cyan-600">${booking.price}</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
                <AlertDialog>
                    {/* Trigger Button */}
                    <Button 
                        variant="light" 
                        className="text-red-500 border border-red-200 flex gap-2 items-center justify-center hover:bg-red-50 px-4 py-2 rounded-md h-auto min-w-0"
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Cancel
                    </Button>

                    {/* Centered Backdrop with the custom red gradient */}
                    <AlertDialog.Backdrop
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
                        variant="blur"
                    >
                        <AlertDialog.Container>
                            {/* FIX: Added bg-white and text colors to make content visible as seen in image_792798.png */}
                            <AlertDialog.Dialog className="bg-black dark:bg-white rounded-2xl shadow-2xl p-8 sm:max-w-[440px] outline-none border border-gray-100">
                                <AlertDialog.CloseTrigger className="text-black hover:text-gray-600" />
                                
                                <AlertDialog.Header className="flex flex-col items-center text-center gap-3">
                                    <AlertDialog.Icon className="bg-red-50 p-3 rounded-full">
                                        <FaTriangleExclamation className="size-6 text-red-600" />
                                    </AlertDialog.Icon>
                                    <AlertDialog.Heading className="text-2xl font-bold text-black dark:text-white">
                                        Cancel Booking?
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body className="py-6 text-center">
                                    <p className="text-black dark:text-black  leading-relaxed">
                                        This action cannot be undone. You are about to cancel your booking for 
                                        <span className="font-bold text-gray-900 dark:text-white block mt-1">
                                            {booking.des_name}
                                        </span>
                                    </p>
                                </AlertDialog.Body>

                                <AlertDialog.Footer className="flex flex-col gap-3">
                                    <Button 
                                        className="w-full font-bold h-12 text-white bg-red-600 hover:bg-red-700" 
                                        onPress={handlebooking_del}
                                    >
                                        Yes, Cancel Forever
                                    </Button>
                                    <Button 
                                        className="w-full font-semibold text-gray-500 hover:text-gray-700 h-12" 
                                        variant="light" 
                                        slot="close"
                                    >
                                        No, Keep Booking
                                    </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>

                {/* View Button */}
                <button className="flex items-center justify-center px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all text-sm font-semibold h-[40px]">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                </button>
            </div>
        </div>
    );
};

export default BookingButtons;
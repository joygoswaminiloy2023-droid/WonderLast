'use client'
import { authClient } from '@/lib/auth-client';
import { DateField, Label } from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Booknow = ({details}) => {

    const [dep_date, setDep_date] = useState(null)




     const { 
        data: session, 
        isPending 
      } = authClient.useSession()

     const User = session?.user
    //  console.log(User)

      const { 
    _id, destinationName, country, imageUrl, 
 price 
    
  } = details;

const handlebookings=async()=>{
    const bookings_data={
    user_name:User.name,
    user_image:User.image,
    user_id:User.id,

    des_id:_id,
    des_name:destinationName,
    des_img:imageUrl,
    departureDate:new Date(dep_date),
    price,
    country

    }
    const res=await fetch("http://localhost:5000/bookings",{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(bookings_data)
    })
    const data=await res.json()
    console.log(data)  

  if (data?.acknowledged === true) {
    toast.success(`${User.name} Thanks For Traveling With Us!`);
  } else {
   toast.error( `${User.name} Booking Failed!`);

  }

   
}



    return (
        <div>
             <div className="relative">
            <div className="sticky top-10 space-y-6">
              <div className="bg-[#15A1BF] text-white rounded-[3.5rem] p-12 shadow-2xl shadow-[#15A1BF]/40 border-t border-white/20">
                <p className="text-blue-100/60 text-xs font-black mb-1 uppercase tracking-[0.3em]">Total Experience</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-7xl font-black tracking-tighter">${price}</span>
                  <span className="text-blue-100/70 font-bold text-lg">/pax</span>
                </div>
                
      <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-6 py-5 shadow-inner">

            <DateField
              isRequired
              name="date"
              value={dep_date}
              onChange={setDep_date}
              className="w-full"
            >
              <Label className="text-blue-100/60 text-[11px] font-black uppercase tracking-widest mb-2 block">
                Departure Date
              </Label>

              <DateField.Group className="flex items-center gap-2">
                <DateField.Input>
                  {(segment) => (
                    <DateField.Segment
                      segment={segment}
                      className="
                        text-white 
                        font-bold 
                        text-lg 
                        focus:bg-white/20 
                        rounded-md 
                        px-1
                      "
                    />
                  )}
                </DateField.Input>
              </DateField.Group>

            </DateField>

          </div>
        </div>

                <button
  onClick={handlebookings}
  disabled={!dep_date}
  className={`w-full py-6 rounded-4xl flex items-center justify-center gap-4 font-black text-2xl transition
    ${dep_date 
      ? "bg-white text-[#15A1BF] hover:bg-gray-50 active:scale-[0.98]" 
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
>
  Book Now
  <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
</button>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 text-center">
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Need help with booking?</p>
                  <p className="text-gray-900 font-black text-lg mt-1 underline">Contact Support</p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Booknow;
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiStar } from 'react-icons/hi';
import { HiArrowUpRight } from 'react-icons/hi2';

const Card = ({destination}) => {
    return (

    <div className="bg-white rounded-lg overflow-hidden group w-full max-w-95">
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
        width={400}
        height={400}
          src={destination?.imageUrl || "https://images.unsplash.com/photo-1537996194471-e657df975ab4"}
          alt={destination?.destinationName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <span className="text-sm font-bold text-gray-800">4.5</span>
          <HiStar className="text-black w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <HiOutlineLocationMarker className="w-4 h-4" />
          <span>{destination?.country || "Nepal"}</span>
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {destination?.destinationName || "Bali Paradise"}
          </h3>
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">
              ${destination?.price || "2700"}
            </span>
            <span className="text-xs text-gray-400 block">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <HiOutlineCalendar className="w-4 h-4" />
          <span>{destination?.duration || "7 Days / 6 Nights"}</span>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <Link href={`Destination/${destination._id}`} ><button className="cursor-pointer flex items-center gap-1 text-[#15A1BF] font-bold text-sm hover:underline uppercase tracking-wide">
            Book Now
            <HiArrowUpRight className="w-4 h-4" />
          </button></Link>
        </div>
      </div>
    </div>
  );
};


export default Card;
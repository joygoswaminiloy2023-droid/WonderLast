import React from 'react';
import Card from '../Components/Card/Card';

const Destinations = async() => {
    const res=await fetch('http://localhost:5000/destination')
    const data=await res.json();
    console.log(data)
    return (
  <div className='container mx-auto px-4 mt-30 mb-10'>
            {/* Header Section (Matching Figma Style) */}
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
                <p className="text-gray-500 mt-2">Find your perfect travel experience from our curated collection</p>
            </div>

            {/* Grid Layout Fix */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
                {data.map(destination => (
                    <Card key={destination._id} destination={destination} />
                ))}
            </div>
        </div>
    );
};

export default Destinations;
import DetailsCard from '@/app/Components/Card/DetailsCard';
import React from 'react';

const Details = async ({params}) => {
    const {id}=await params;
  

const res=await fetch(`http://localhost:5000/destination/${id}`)
const details= await res.json()

    return (
        <div>
            <DetailsCard key={id} details={details}></DetailsCard>
        </div>
    );
};

export default Details;
import DetailsCard from '@/app/Components/Card/DetailsCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Details = async ({params}) => {
    const {id}=await params;
  
const  {token}=await auth.api.getToken({
    headers:await headers()
})
console.log(token)
const res=await fetch(`http://localhost:5000/destination/${id}`, {
    headers: {
        authorization: `Bearer ${token}`
    }
});
const details= await res.json()
console.log(details)

    return (
        <div>
            <DetailsCard  details={details}></DetailsCard>
        </div>
    );
};

export default Details;
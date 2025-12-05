import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const CompletedDelivery = () => {
     const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: parcels = [], refetch } = useQuery({

        // how many parcle now pending get this api

        queryKey: ['parcels', user.email, 'rider_assign'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?riderEmail=${user.email}&deliveryStatus=parcel_deliverd`);

            return res.data
        }
    })
console.log(parcels);
const CalculatePayout=(parcel)=>{
    if (parcel.senderDistrict===parcel.reciverDistrict) {
        return parcel.cost*0.8
        
    }
    else{
        return parcel.cost*0.6
    }

}

    return (
        <div>
            <h1>completed delivery{parcels.length}</h1>
            <table className="table w-full table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Pockup district</th>
                        <th>Cost</th>
                        <th>Payout</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.reciverDistrict}</td>
                            <td>{parcel.cost}</td>
                            <td>{CalculatePayout(parcel)}</td>
                            <td className='space-x-2'>
                                 <button className='btn bg-amber-300'>cash out</button>
                                 </td>
                         </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompletedDelivery;
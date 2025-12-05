import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';


const AssignDelivery = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: parcels = [], refetch } = useQuery({

        // how many parcle now pending get this api

        queryKey: ['parcels', user.email, 'rider_assign'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?riderEmail=${user.email}&deliveryStatus=rider_assign`);

            return res.data
        }
    })

    const handelDeliveryStatusUpdate = (parcel,status) => {
       const statusInfo = { 
        deliveryStatus:status ,
        riderId:parcel.riderId,
        trackingId:parcel.trackingId

       };
        let message = `Parcel status updated:${status.split('_').join(' ')}`;
        
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res =>{
                console.log(res.data);
                
               
                if (res.data.modifiedCount) {
                    refetch()
                     Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }


    return (
        <div>
            <h1 className='text-center'> Your Order</h1>

            <table className="table w-full table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Confirm</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td>{parcel.parcelName}</td>
                            <td className='space-x-2'>
                                {
                                    parcel.deliveryStatus === 'rider_assign' ?
                                        <>
                                            <button
                                                onClick={() => handelDeliveryStatusUpdate(parcel,'rider_arriving')}
                                                className='btn btn-primary'>Accept</button>

                                            <button
                                                onClick={() => handelDeliveryStatusUpdate(parcel,'rejected')}
                                                className='btn btn-warning'>Reject</button>
                                        </>
                                        :
                                        <span className='text-green-500'>Accepeted Order</span>
                                }
                            </td>
                            <td className='space-x-2'>
                                <button
                                    onClick={() => handelDeliveryStatusUpdate(parcel,'parcel_pick_up')}
                                    className='btn btn-outline'>Mark as Pick Up</button>
                                <button
                                    onClick={() => handelDeliveryStatusUpdate(parcel, 'parcel_deliverd')}
                                    className='btn btn-primary'>Parcel Delivered</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignDelivery;

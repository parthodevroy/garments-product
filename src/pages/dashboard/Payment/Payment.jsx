
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';

const Payment = () => {
    const { orderId } = useParams();
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <span className="loading loading-spinner"></span>;
    }
    console.log(parcel);



    const handelPayment = async () => {
        const userInfo = {
            totalPrice:parcel.totalPrice, // your actual field
            productName: parcel.productName,
            orderId: parcel._id,
            buyerEmail: user?.email,
        };


        const res = await axiosSecure.post("/create-checkout-session", userInfo);
        window.location.href = res.data.url;
    };

    return (
        <div>
            <h1>
                Pay now for
            </h1>
            <button onClick={handelPayment} className="btn btn-primary" type="button">
                Pay
            </button>
        </div>
    );
};

export default Payment;

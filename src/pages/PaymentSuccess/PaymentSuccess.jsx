
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router'; 
import useAxios from '../../hooks/useAxios';



const PaymentSuccess = () => {
   
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const axiosSecure = useAxios(); 
    const [paymentStatus, setPaymentStatus] = useState("verifying"); 

// useEffect(() => {
//     if (!sessionId) return;

//     let called = false; 

//     const verifyPayment = async () => {
//         if (called) return;  
//         called = true;

//         try {
//             const res = await axiosSecure.post("/payment/verify", { sessionId });

//             if (res.data.verified) {
//                 setPaymentStatus("success");
//             } else {
//                 setPaymentStatus("failed");
//             }
//         } catch (err) {
//             setPaymentStatus("error",err);
//         }
//     };

//     verifyPayment();
// }, [sessionId]); 

const calledRef = useRef(false);
useEffect(() => {
    if (!sessionId) return;
    if (calledRef.current) return;
    calledRef.current = true;

    const verifyPayment = async () => {
        try {
            const res = await axiosSecure.post("/payment/verify", { sessionId });
            setPaymentStatus(res.data.verified ? "success" : "failed");
        } catch (err) {
            setPaymentStatus("error",err);
        }
    };
    verifyPayment();
}, [sessionId]);

   
    if (paymentStatus === "verifying") {
        return <div className="text-center mt-20">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4">Verifying Payment...</p>
        </div>;
    }
    
    let message, colorClass;
    if (paymentStatus === "success") {
        message = "Payment Successfully Completed!";
        colorClass = "text-green-500";
    } else {
        message = "Payment Verification Failed or Canceled!";
        colorClass = "text-red-500";
    }

    return (
        <div className="text-center mt-20">
            <h1 className={`${colorClass} text-2xl font-semibold`}>{message}</h1>
            <p className="mt-2 text-sm text-gray-600">Session ID: {sessionId}</p>
            <Link to={"/dashboard/my-orders"}>
                <button className='btn btn-primary mt-6'>Go to Dashboard</button>
            </Link>
        </div>
    );
};

export default PaymentSuccess;
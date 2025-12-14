
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router'; 

import axios from 'axios';



const PaymentSuccess = () => {
   
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    
    const [paymentStatus, setPaymentStatus] = useState("verifying"); 


const calledRef = useRef(false);

useEffect(() => {
    if (!sessionId) return;
    if (calledRef.current) return;
    calledRef.current = true;

    const verifyPayment = async () => {
        try {
            console.log("Verifying Payment, sessionId:", sessionId);  
            const res = await axios.post("https://garments-management-server.vercel.app/payment/verify", { sessionId });
            console.log("Payment verify response:", res.data); 
            setPaymentStatus(res.data.verified ? "success" : "failed");
        } catch (err) {
            console.error("Payment verify error:", err); 
            setPaymentStatus("error");
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
            {/* <Link to={"/booking"}>
                <button className='btn btn-primary mt-6'>Go to Dashboard</button>
            </Link> */}
            <Link to={"/dashboard/Buyer-orders"}>
                <button className='btn btn-primary mt-6'>Go to Dashboard</button>
            </Link>
        </div>
    );
};

export default PaymentSuccess;

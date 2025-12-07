import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h1 className='text-2xl text-red-500 font-semibold'>Payment Cancel</h1>
            <Link to={"/dashboard/my-orders"}><button className='btn btn-primary'>try again</button></Link>
        </div>
    );
};

export default PaymentCancel;
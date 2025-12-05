import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

    const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: payments = [] } = useQuery({
        queryKey: ["myDashboard", user?.email],
        queryFn: async () => {
           
            const res = await axiosSecure.get(`payment?email=${user.email}`)
             
            return res.data
        }
    })
   

    return (
        <div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ParcelName</th>
                            <th>Cost</th>
                            <th>Transsation Id</th>
                            <th>Payment Date</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map((payment, index) =>
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.parcelName}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.
                                        transactionId}</td>
                                        <td>{payment.paidAt}</td>
                                        <td><button>view</button></td>

                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
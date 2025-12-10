import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../../component/LoadingPage/LoadingPage';
import { FaEye, FaTimes } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["myPayments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payment?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const [selectedPayment, setSelectedPayment] = useState(null);
    // console.log(selectedPayment);
    

    if (isLoading) return <LoadingPage />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Payment History</h1>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border-b">#</th>
                            <th className="px-4 py-2 border-b">Parcel Name</th>
                            <th className="px-4 py-2 border-b">Cost</th>
                            <th className="px-4 py-2 border-b">Transaction ID</th>
                            <th className="px-4 py-2 border-b">Payment Date</th>
                            <th className="px-4 py-2 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No payments found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 border-b text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-b">{payment.parcelName}</td>
                                    <td className="px-4 py-3 border-b font-semibold text-green-600">${payment.amount}</td>
                                    <td className="px-4 py-3 border-b font-mono">{payment.transactionId}</td>
                                    <td className="px-4 py-3 border-b">{new Date(payment.paidAt).toLocaleString()}</td>
                                    <td className="px-4 py-3 border-b text-center">
                                        <button
                                            onClick={() => setSelectedPayment(payment)}
                                            className="btn btn-sm btn-primary flex items-center gap-1 hover:bg-blue-600 transition"
                                        >
                                            <FaEye /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-150 relative">
                        <button
                            onClick={() => setSelectedPayment(null)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                        <p><strong>Parcel:</strong> {selectedPayment.productName}</p>
                        <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
                        <p><strong>Currency:</strong> ${selectedPayment.currency}</p>
                        <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
                        <p><strong>Paid At:</strong> {new Date(selectedPayment.paidAt).toLocaleString()}</p>
                        <p><strong>Email Id:</strong> {selectedPayment.customerEmail || "N/A"}</p>
                        <p className='text-green-500'><strong>Status:</strong> {selectedPayment.paymentStatus || "N/A"}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;

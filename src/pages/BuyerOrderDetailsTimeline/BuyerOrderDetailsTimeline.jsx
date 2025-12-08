import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import LoadingPage from "../../component/LoadingPage/LoadingPage";

const BuyerOrderDetailsTimeline = () => {
    const { id } = useParams(); // order id
    const axiosSecure = useAxios();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/orders/${id}`)
            .then(res => setOrder(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!order) return <LoadingPage />;

    const steps = ["Order Placed", "Cutting Completed", "Sewing Started", "Delivered"];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Order Details</h2>

            <div className="p-4 border rounded mb-6">
                <p><strong>Product:</strong> {order.productName}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Payment:</strong> {order.paymentStatus}</p>
            </div>

            <h3 className="text-xl font-semibold mb-3">Tracking Timeline</h3>

            <div className="border-l-2 pl-4 space-y-4 mb-6">
                {steps.map(step => {
                    const done = order.trackingLog?.some(t => t.step === step);
                    const stepDate = done ? order.trackingLog.find(t => t.step === step)?.date : null;
console.log(order);

                    return (
                        <div key={step} className="relative">
                            <div
                                className={`absolute -left-3 w-3 h-3 rounded-full ${done ? "bg-green-600" : "bg-gray-300"}`}
                            ></div>
                            <p className={`${done ? "font-bold text-green-700" : "text-gray-500"}`}>{step}</p>
                            {done && <p className="text-gray-500 text-sm">{new Date(stepDate).toLocaleString()}</p>}
                        </div>
                    );
                })}
            </div>

            {/* Link to Buyer Orders page */}
            

            <div className="text-center mt-6">
                <Link to="/dashboard/buyer-orders" className="btn btn-primary">
                    Back to My Orders
                </Link>
            </div>
        </div>
    );
};

export default BuyerOrderDetailsTimeline;

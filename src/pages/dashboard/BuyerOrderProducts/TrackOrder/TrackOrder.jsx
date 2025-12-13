import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import LoadingPage from "../../../../component/LoadingPage/LoadingPage";
import axios from "axios";

const TrackOrder = () => {
    const { orderId } = useParams(); // Get order ID from URL

    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Fetch order details including tracking log
        axios.get(`http://localhost:3000/orders/${orderId}`)
            .then(res => {
                console.log("Order data from API:", res.data); 
                setOrder(res.data);
            })
            .catch(err => console.error(err));
    }, [orderId]);


    if (!order) return <LoadingPage />;

    // Sort trackingLog by date ascending
    const sortedTracking = [...(order.trackingLog || [])].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );



    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Track Your Order</h2>

            {/* Order summary */}
            <div className="p-4 border rounded mb-6 shadow">
                <p className=""><strong>Product:</strong> {order.productName}</p>
                <p className=""><strong>Total:</strong> ${order.totalPrice}</p>
                <p className=""><strong>Status:</strong> {order.orderStatus}</p>
                <p className=""><strong>Payment:</strong> {order.paymentStatus}</p>
                <p className=""><strong>Order ID:</strong> {order._id}</p>
            </div>

            <h3 className="text-xl font-semibold mb-3">Tracking Timeline</h3>

            {sortedTracking.length === 0 ? (
                <p className="text-gray-500">No tracking information available yet.</p>
            ) : (
                <div className="border-l-2 pl-4 space-y-6 mb-6 relative">
                    {sortedTracking.map((step, index) => {
                        const isLatest = index === sortedTracking.length - 1;
                        return (
                            <div key={index} className="relative">
                                {/* Circle */}
                                <div
                                    className={`absolute -left-3 w-4 h-4 rounded-full ${isLatest ? "bg-blue-600 animate-pulse" : "bg-green-600"
                                        }`}
                                ></div>

                                <div className={`${isLatest ? "font-bold text-blue-700" : "text-gray-700"}`}>
                                    <p className="text-lg">{step.step}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(step.date).toLocaleString()}
                                    </p>
                                    {step.location && (
                                        <p className="text-sm text-gray-600">Location: {step.location}</p>
                                    )}
                                    {step.note && (
                                        <p className="text-sm text-gray-600">Note: {step.note}</p>
                                    )}
                                    {step.image && (
                                        <img
                                            src={step.image}
                                            alt={step.step}
                                            className="w-48 h-32 object-cover mt-2 rounded"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Back button */}
            <div className="text-center mt-6">
                <Link to="/dashboard/buyer-orders" className="btn btn-primary">
                    Back to My Orders
                </Link>
            </div>
        </div>
    );
};

export default TrackOrder;

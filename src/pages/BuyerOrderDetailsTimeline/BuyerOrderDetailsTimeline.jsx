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

    // Sort trackingLog by date to show timeline properly
    const sortedTrackingLog = order.trackingLog?.sort((a, b) => new Date(a.date) - new Date(b.date));

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

            {sortedTrackingLog && sortedTrackingLog.length > 0 ? (
                <div className="border-l-2 pl-4 space-y-4 mb-6">
                    {sortedTrackingLog.map((t, i) => (
                        <div key={i} className="relative">
                            <div
                                className="absolute -left-3 w-3 h-3 rounded-full bg-green-600"
                            ></div>
                            <p className="font-bold text-green-700">{t.step}</p>
                            <p className="text-gray-500 text-sm">{new Date(t.date).toLocaleString()}</p>
                            {t.note && <p className="text-gray-500 text-sm">Note: {t.note}</p>}
                            {t.location && <p className="text-gray-500 text-sm">Location: {t.location}</p>}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No tracking information available yet.</p>
            )}

            {/* Link to Buyer Orders page */}
            <div className="text-center mt-6">
                <Link to="/dashboard" className="btn btn-primary">
                    Back Dashboard
                </Link>
            </div>
        </div>
    );
};

export default BuyerOrderDetailsTimeline;

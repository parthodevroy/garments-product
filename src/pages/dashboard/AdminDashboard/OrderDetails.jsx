import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const OrderDetails = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxios();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      axiosSecure
        .get(`/orders/${orderId}`)
        .then((res) => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [orderId, axiosSecure]);

  if (loading) return <LoadingPage />;
  if (!order) return <div className="p-6 text-center">Order not found.</div>;

  //  Safe sorting
  const trackingLog = [...(order.trackingLog || [])].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      {/* ================= ORDER INFO ================= */}
      <div className="dash-card text shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        <div className="grid md:grid-cols-2 gap-3">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Customer:</strong> {order.customerEmail}</p>
          <p><strong>Manager:</strong> {order.managerEmail}</p>
          <p><strong>Payment Method:</strong> {order.payment_method}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          <p><strong>Order Status:</strong> {order.orderStatus}</p>
          <p><strong>Tracking ID:</strong> {order.trackingId || "N/A"}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
          <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
          <p><strong>Contact:</strong> {order.contactNumber}</p>
        </div>
      </div>

      {/* ================= TRACKING TIMELINE ================= */}
      <div className="dash-card text shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-6">Tracking History</h3>

        {trackingLog.length > 0 ? (
          <div className="relative border-l-2 border-blue-500 pl-6 space-y-6">
            {trackingLog.map((log, index) => (
              <div key={index} className="relative">
                {/* Dot */}
                <span className="absolute -left-[9px] w-4 h-4 bg-blue-500 rounded-full"></span>

                <div className="bg-gray-800/40 p-4 rounded-lg">
                  <p className="font-semibold text-blue-400">{log.step}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(log.date).toLocaleString()}
                  </p>

                  {log.location && (
                    <p className="text-sm text-gray-300">
                      📍 Location: {log.location}
                    </p>
                  )}

                  {log.note && (
                    <p className="text-sm text-gray-300">
                      📝 Note: {log.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No tracking updates available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const BuyerOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [orderId]);

  if (!order) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Order Basic Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Tracking ID:</strong> {order.trackingId}</p>
        <p><strong>Product Name:</strong> {order.productName}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>

        <p><strong>Unit Price:</strong> {order.unitPrice} BDT</p>
        <p><strong>Total Price:</strong> {order.totalPrice} BDT</p>

        <p><strong>Order Status:</strong> {order.orderStatus}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>

        <p><strong>Payment Method:</strong> {order.payment_method}</p>

        <p><strong>Customer Email:</strong> {order.customerEmail}</p>
        <p><strong>Contact Number:</strong> {order.contactNumber}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        <p><strong>Seller Email:</strong> {order.manageremail}</p>

        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* Tracking Timeline */}
      <h2 className="text-2xl font-semibold mb-4">Tracking Timeline</h2>

      <div className="relative border-l-4 border-blue-500 ml-4 pl-6">
        {order.trackingLog?.length > 0 ? (
          order.trackingLog.map((log, i) => (
            <div key={i} className="mb-8 relative">
              {/* Blue dot */}
              <div className="absolute -left-3 top-1 bg-blue-500 text-white rounded-full p-2">
                <FaCheckCircle size={10} />
              </div>

              <p className="text-lg pl-6 font-bold">{log.step}</p>
              <p className="text-gray-500 text-sm">
                {new Date(log.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Tracking updates not available yet.</p>
        )}
      </div>
    </div>
  );
};

export default BuyerOrderDetails;

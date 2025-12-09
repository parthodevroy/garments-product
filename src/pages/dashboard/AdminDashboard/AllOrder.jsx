import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const AllOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axiosSecure
      .get(`/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  const handleStatusChange = (orderId, status) => {
    axiosSecure
      .patch(`/orders/${orderId}/status`, { status })
      .then(() => {
        toast.success(`Order ${status}`);
        fetchOrders();
      })
      .catch(err => console.error(err));
  };

  const handleTrackingUpdate = (orderId, step) => {
    axiosSecure
      .patch(`/orders/${orderId}/tracking`, { step })
      .then(res => {
        toast.success(`Tracking updated: ${step}`);
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? res.data : order
          )
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map(order => (
            <div
              key={order._id}
              className="border p-4 rounded-xl shadow bg-white"
            >
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Buyer:</strong> {order.customerEmail}</p>
              <p><strong>Manager:</strong> {order.manageremail}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total:</strong> ${order.totalPrice}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>

              {["pending", "paid", "order_paid"].includes(order.orderStatus) && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(order._id, "accepted")}
                    className="btn btn-success btn-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(order._id, "rejected")}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </div>
              )}

              {order.orderStatus === "accepted" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Cutting Completed", "Sewing Started", "Delivered"].map(
                    step => {
                      const isCompleted = order.trackingLog?.some(
                        t => t.step === step
                      );
                      if (isCompleted) return null;

                      return (
                        <button
                          key={step}
                          onClick={() => handleTrackingUpdate(order._id, step)}
                          className="btn btn-info btn-sm"
                        >
                          {step}
                        </button>
                      );
                    }
                  )}
                </div>
              )}

              {order.trackingLog?.length > 0 && (
                <div className="mt-3">
                  <strong>Tracking:</strong>
                  <ul className="list-disc ml-5">
                    {order.trackingLog.map((t, i) => (
                      <li key={i}>
                        {t.step} - {new Date(t.date).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrder;

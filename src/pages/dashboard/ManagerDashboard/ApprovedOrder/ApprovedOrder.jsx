import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router";
import useUserStatus from "../../../../hooks/useUserStatus";
import Swal from "sweetalert2";

const ApprovedOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingStep, setTrackingStep] = useState("");
  const {isSuspended}=useUserStatus()

  const fetchOrders = () => {
    axiosSecure
      .get(`/orders/approved/by-manager/${user.email}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  const handleAddTracking = (orderId) => {
     if (isSuspended) {
            Swal.fire({
              icon: "error",
              title: "Suspended",
              text: "You cannot created an product because you are suspended.cheek your profile for suspended reason"
            });
            return;
          }
    if (!trackingStep) return toast.error("Select a step");
    axiosSecure
      .patch(`/orders/${orderId}/tracking`, { step: trackingStep })
      .then(res => {
        toast.success(`Tracking step "${trackingStep}" added`);
        setOrders(prev =>
          prev.map(order => order._id === orderId ? res.data : order)
        );
        setSelectedOrder(null);
        setTrackingStep("");
      })
      .catch(err => toast.error(err.response?.data?.message || "Failed"));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Approved Orders</h2>

      <table className="table w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Approved Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b">
              <td>{order._id}</td>
              <td>{order.customerEmail}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-info btn-sm mr-2"
                  onClick={() => setSelectedOrder(order)}
                >
                  Add Tracking
                </button>
                <Link to={`/dashboard/buyer-order-details/${order._id}`}>
                <button
                  className="btn btn-secondary btn-sm"
                 
                >
                  View Tracking
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Tracking for {selectedOrder.productName}</h3>

            {/* Add Tracking */}
            <div className="flex flex-col gap-2 mb-4">
              <select
                value={trackingStep}
                onChange={e => setTrackingStep(e.target.value)}
                className="input input-bordered w-full"
              >
                <option value="">Select Step</option>
                <option value="Cutting Completed">Cutting Completed</option>
                <option value="Sewing Started">Sewing Started</option>
                <option value="Finishing">Finishing</option>
                <option value="QC Checked">QC Checked</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleAddTracking(selectedOrder._id)}
              >
                Add Step
              </button>
            </div>

            {/* View Tracking */}
            {selectedOrder.trackingLog?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Tracking Log</h4>
                <ul className="list-disc ml-4 text-sm">
                  {selectedOrder.trackingLog.map((t, i) => (
                    <li key={i}>
                      {t.step} — {new Date(t.date).toLocaleString()} {t.note && ` — ${t.note}`} {t.location && ` — ${t.location}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrder;

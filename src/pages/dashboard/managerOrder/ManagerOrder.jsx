
import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const ManagerOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);


  // Fetch pending orders for this manager
  const fetchOrders = () => {
    axiosSecure
      .get(`/orders/pending/by-manager/${user.email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  // Accept / Reject order
  const handleStatusChange = (orderId, status) => {

    axiosSecure
      .patch(`/orders/${orderId}/status`, { status })
      .then(() => {
        toast.success(`Order ${status}`);
        fetchOrders();
      })
      .catch((err) => console.error(err));
  };
  console.log(orders);

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">Pending Orders</h2>

      <div className="overflow-x-auto dash-card shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="dash-card text">
              <th className="border-b border-white">Product</th>
              <th className="border-b border-white">Buyer</th>
              <th className="border-b border-white">Qty</th>
              <th className="border-b border-white">Total</th>
              <th className="border-b border-white">Status</th>
              <th className="border-b border-white">Actions</th>
              <th className="border-b border-white">View</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text">
                  No pending orders found.
                </td>
              </tr>
            ) : (
              orders
                .filter(order => order.orderStatus === "pending")
                .map((order) => (

                  <tr key={order._id} className="border-b text">
                    <td className="border-b border-white">{order.productName}</td>
                    <td className="border-b border-white">{order.customerEmail}</td>
                    <td className="border-b border-white">{order.quantity}</td>
                    <td className="border-b border-white">${order.totalPrice}</td>
                    <td className="font-semibold border-b border-white">{order.orderStatus}</td>

                    {/* Status Buttons */}
                    <td className="border-b border-white">
                      {order.orderStatus === "pending" ? (
                        <div className="flex gap-2">
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
                      ) : order.orderStatus === "accepted" ? (
                        <span className="text-green-600 font-semibold">Accepted</span>
                      ) : order.orderStatus === "rejected" ? (
                        <span className="text-red-600 font-semibold">Rejected</span>
                      ) : (
                        <span className="text-gray-600 font-semibold">{order.orderStatus}</span>
                      )}
                    </td>

                    {/* View Button */}
                    <td className="border-b border-white">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing order details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="dash-card p-6 rounded-lg w-full max-w-lg shadow-lg relative overflow-y-auto max-h-[90vh]">

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4 text-center">
              Order Details
            </h3>

            {/* BASIC INFO */}
            <div className="space-y-2 text-sm">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Tracking ID:</strong> {selectedOrder.trackingId}</p>

              <hr className="my-2 opacity-30" />

              <p><strong>Product Name:</strong> {selectedOrder.productName}</p>
              <p><strong>Product ID:</strong> {selectedOrder.productId}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Unit Price:</strong> {selectedOrder.unitPrice} BDT</p>
              <p><strong>Total Price:</strong> {selectedOrder.totalPrice} BDT</p>

              <hr className="my-2 opacity-30" />

              <p><strong>Order Status:</strong>
                <span className="ml-2 font-semibold text-yellow-400">
                  {selectedOrder.orderStatus}
                </span>
              </p>

              <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.payment_method}</p>
              {selectedOrder.transactionId && (
                <p><strong>Transaction ID:</strong> {selectedOrder.transactionId}</p>
              )}

              <hr className="my-2 opacity-30" />

              {/* CUSTOMER INFO */}
              <p><strong>Customer Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
              <p><strong>Customer Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Contact Number:</strong> {selectedOrder.contactNumber}</p>
              <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>

              <hr className="my-2 opacity-30" />

              {/* MANAGER INFO */}
              <p><strong>Manager Email:</strong> {selectedOrder.managerEmail}</p>

              {/* NOTES */}
              {selectedOrder.additionalNotes && (
                <>
                  <hr className="my-2 opacity-30" />
                  <p><strong>Additional Notes:</strong> {selectedOrder.additionalNotes}</p>
                </>
              )}

              <hr className="my-2 opacity-30" />
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManagerOrder;

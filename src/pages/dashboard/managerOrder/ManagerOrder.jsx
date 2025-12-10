// import React, { useEffect, useState } from "react";
// import useAxios from "../../../hooks/useAxios";
// import useAuth from "../../../hooks/useAuth";
// import { toast } from "react-toastify";

// const ManagerOrder = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxios();
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = () => {
//     axiosSecure
//       .get(`/orders/by-manager/${user.email}`)
//       .then(res => setOrders(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     if (user?.email) fetchOrders();
//   }, [user]);


//   const handleStatusChange = (orderId, status) => {
//     axiosSecure
//       .patch(`/orders/${orderId}/status`, { status })
//       .then(() => {
//         toast.success(`Order ${status}`);
//         fetchOrders();
//       })
//       .catch(err => console.error(err));
//   };

//   const handleTrackingUpdate = (orderId, step) => {
//   axiosSecure
//     .patch(`/orders/${orderId}/tracking`, { step })
//     .then(res => {
//       toast.success(`Tracking updated: ${step}`);
//       // Update frontend state with latest order from server
//       setOrders(prev =>
//         prev.map(order =>
//           order._id === orderId ? res.data : order
//         )
//       );
//     })
//     .catch(err => console.error(err));
// };




//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Orders for My Products</h2>

//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map(order => (
//             <div key={order._id} className="border p-4 rounded shadow">
//               <p><strong>Product:</strong> {order.productName}</p>
//               <p><strong>Buyer:</strong> {order.customerEmail}</p>
//               <p><strong>Quantity:</strong> {order.quantity}</p>
//               <p><strong>Total:</strong> ${order.totalPrice}</p>
//               <p><strong>Status:</strong> {order.orderStatus}</p>

//               {["pending", "paid","order_paid"].includes(order.orderStatus) && (
//                 <div className="mt-2 space-x-2">
//                   <button
//                     onClick={() => handleStatusChange(order._id, "accepted")}
//                     className="btn btn-success btn-sm"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(order._id, "rejected")}
//                     className="btn btn-error btn-sm"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}

//               {order.orderStatus === "accepted" && (
//                 <div className="mt-2 space-x-2 flex gap-2">
//                   {["Cutting Completed", "Sewing Started", "Delivered"].map(step => {
//                     const isCompleted = order.trackingLog?.some(t => t.step === step);
//                     if (isCompleted) return null;

//                     return (
//                       <button
//                         key={step}
//                         onClick={() => handleTrackingUpdate(order._id, step)}
//                         className="btn btn-sm btn-info"
//                       >
//                         {step}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}


//               {order.trackingLog?.length > 0 && (
//                 <div className="mt-2">
//                   <strong>Tracking:</strong>
//                   <ul className="list-disc ml-5">
//                     {order.trackingLog.map((t, i) => (
//                       <li key={i}>{t.step} - {new Date(t.date).toLocaleString()}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerOrder;
import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useUserStatus from "../../../hooks/useUserStatus";
import Swal from "sweetalert2";

const ManagerOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const {isSuspended}=useUserStatus()


  // Fetch pending orders for this manager
  const fetchOrders = () => {
    axiosSecure
      .get(`/orders/by-manager/${user.email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  // Accept / Reject order
  const handleStatusChange = (orderId, status) => {
     if (isSuspended) {
            Swal.fire({
              icon: "error",
              title: "Suspended",
              text: "You cannot created an product because you are suspended.cheek your profile for suspended reason"
            });
            return;
          }
    axiosSecure
      .patch(`/orders/${orderId}/status`, { status })
      .then(() => {
        toast.success(`Order ${status}`);
        fetchOrders();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">Pending Orders</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>Product</th>
              <th>Buyer</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No pending orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td>{order.productName}</td>
                  <td>{order.customerEmail}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice}</td>
                  <td className="font-semibold">{order.orderStatus}</td>

                  {/* Status Buttons */}
                  <td>
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
                  <td>
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
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <img
              src={selectedOrder.productImage}
              alt={selectedOrder.productName}
              className="w-64 h-64 object-cover rounded mb-4 mx-auto"
            />
            <p><strong>Product:</strong> {selectedOrder.productName}</p>
            <p><strong>Buyer:</strong> {selectedOrder.customerEmail}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Total:</strong> ${selectedOrder.totalPrice}</p>
            <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerOrder;

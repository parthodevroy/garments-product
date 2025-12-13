import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router"; // view page link

const AllOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // For filter
  const [searchQuery, setSearchQuery] = useState(""); // Optional search

  const fetchOrders = () => {
    axiosSecure
      .get(`/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
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
      .catch((err) => console.error(err));
  };

  // Filtered orders
  const filteredOrders = orders
    .filter((o) => (filterStatus ? o.orderStatus === filterStatus : true))
    .filter((o) =>
      searchQuery
        ? o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.productName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl text font-bold mb-4">All Orders</h2>

      {/* Filter & Search */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          className="input text dash input-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>

        </select>

        <input
          type="text"
          placeholder="Search by user or product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input dash  text input-bordered"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto dash-card rounded-lg">
        <table className="table-auto w-full text text-left">
          <thead className="dash-card border-b border-b-white">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className=" border-b border-b-white">
                  <td className="px-4 py-2">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2">{order.customerEmail}</td>
                  <td className="px-4 py-2">{order.productName}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">{order.orderStatus}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* View button */}
                    <Link
                      to={`/dashboard/orders/${order._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>


                    {/* Optional: quick status update */}
                    {["pending", "paid", "order_paid"].includes(order.orderStatus) && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(order._id, "accepted")
                          }
                          className="btn btn-success btn-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(order._id, "rejected")
                          }
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrder;

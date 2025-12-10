import React, { useEffect, useState } from "react";

import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";

const PendingOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("pending"); 
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = () => {
    if (!user?.email) return;

    axiosSecure
      .get(`/orders/pending/by-manager/${user.email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // Filtered and searched orders
  const filteredOrders = orders.filter((order) => {
    console.log(order);
    
    const matchesStatus = filterStatus === "all" || order.orderStatus === filterStatus;
    const matchesSearch =
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
   
    
  });
  
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Orders</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by product or user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-200">
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
             
                
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.customerEmail}</td>
                  <td className="px-4 py-2">{order.productName}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2 capitalize">{order.orderStatus}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/orders/details/${order._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingOrder;

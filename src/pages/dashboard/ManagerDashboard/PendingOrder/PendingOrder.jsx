import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import useUserStatus from "../../../../hooks/useUserStatus";
import Swal from "sweetalert2";

const PendingOrder = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { isSuspended, suspendReason, loading: statusLoading } = useUserStatus();

    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("pending");
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Fetch pending orders
    const fetchOrders = async () => {
        if (!user?.email) return;
        setLoadingOrders(true);
        try {
            const res = await axiosSecure.get(`/orders/pending/by-manager/${user.email}`);
            setOrders(res.data); // only pending orders from backend
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    // Accept order
    // Accept order
    // Accept order
    const handleAccept = async (orderId) => {
        try {
            await axiosSecure.patch(`/orders/accept/${orderId}`);
            Swal.fire("Success", "Order accepted successfully", "success");

            // Update order status in the state
            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, orderStatus: "accepted" } // update status
                        : order
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleReject = async (orderId) => {
        try {
            await axiosSecure.patch(`/orders/reject/${orderId}`);
            Swal.fire("Success", "Order rejected successfully", "success");

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, orderStatus: "rejected" }
                        : order
                )
            );
        } catch (err) {
            console.error(err);
        }
    };


    // Filtered & searched orders
    const filteredOrders = orders.filter((order) => {
        const matchesStatus = filterStatus === "all" || order.orderStatus.toLowerCase() === filterStatus.toLowerCase();
        const matchesSearch =
            order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (statusLoading || loadingOrders) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 dash-card min-h-screen">
            <h2 className="text-xl   font-bold mb-6  text-center">Pending Orders</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
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
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No orders found.</p>
            ) : (
                <div className="overflow-x-auto dash-card shadow-md rounded-lg">
                    <table className="table-auto dash w-full border-collapse">
                        <thead className="dash-card text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border-b">Order ID</th>
                                <th className="px-4 py-2 border-b">User</th>
                                <th className="px-4 py-2 border-b">Product</th>
                                <th className="px-4 py-2 border-b">Quantity</th>
                                <th className="px-4 py-2 border-b">Status</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                let statusColor = "bg-yellow-200 text-yellow-800"; // pending color
                                return (
                                    <tr key={order._id} className="dash-card transition">
                                        <td className="px-4 py-3 border-b font-mono">{order._id}</td>
                                        <td className="px-4 py-3 border-b">{order.customerEmail}</td>
                                        <td className="px-4 py-3 border-b">{order.productName}</td>
                                        <td className="px-4 py-3 border-b">{order.quantity}</td>
                                        <td className={`px-4 py-2 border-b rounded font-semibold text-center ${statusColor}`}>
                                            {order.orderStatus}
                                        </td>
                                        <td className="px-4 py-3 border-b flex gap-2">
                                            <Link to={`/orders/details/${order._id}`} className="btn btn-sm btn-info">View</Link>
                                            <button
                                                onClick={() => handleAccept(order._id)}
                                                disabled={isSuspended}
                                                className={`btn btn-sm btn-success ${isSuspended ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(order._id)}
                                                disabled={isSuspended}
                                                className={`btn btn-sm btn-error ${isSuspended ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingOrder;

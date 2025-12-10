import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdPageview } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import LoadingPage from '../../component/LoadingPage/LoadingPage';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const BuyerOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // Fetch orders placed by this user
  const { data: orders = [], refetch, isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/by-buyer/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <LoadingPage />;

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px] text-center">
        <p className="text-2xl text-gray-500">You did not order anything yet.</p>
      </div>
    );
  }

  // Delete only pending orders
  const handleDelete = (id, status) => {
    if (status !== "pending") {
      return Swal.fire("❌ Error", "Only pending orders can be cancelled.", "error");
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You can't recover this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/by-buyer/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Order has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>


      <table className="table w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b">
              <td className="font-mono text-sm">{o.orderId || o._id}</td>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td className="capitalize font-semibold text-yellow-700">{o.orderStatus}</td>
              <td>
                {o.paymentStatus === "paid" ? (
                  <span className="text-green-600 font-bold">Paid</span>
                ) : o.payment_method === "PayFast" ? (
                  <Link to={`/dashboard/payment/${o._id}`}>
                    <button className="btn btn-primary btn-sm">Pay</button>
                  </Link>
                ) : (
                  <span className="text-blue-600 font-bold">Cash on Delivery</span>
                )}
              </td>
              <td className="flex gap-2">
                {/* VIEW BUTTON
                <Link to={`/dashboard/buyer-order-details/${o._id}`}>
                  <button className="btn btn-sm"><MdPageview /></button>
                </Link> */}
                <Link to={`/dashboard/buyer-orders/${o._id}`}>
                  <button className="btn btn-primary btn-sm">View</button>
                </Link>


                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(o._id, o.orderStatus)}
                  className="btn btn-sm btn-error"
                >
                  <FaRegTrashAlt />
                </button>
                <Link to={`/dashboard/track-order/${o._id}`}>
                  <button className="btn btn-sm">Track Order</button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerOrder;

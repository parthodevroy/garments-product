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
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, index) =>
            <tr key={o._id}>
              <th>{index + 1}</th>

              <td>{o.productName}</td>

              <td>${o.totalPrice}</td>

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

              <td>
                <Link to={`/order-log/${o.orderId}`} className="text-blue-600 underline">
                  {o.orderId}
                </Link>
              </td>

              <td className="font-semibold capitalize text-yellow-700">
                {o.orderStatus}
              </td>

              <td className="flex gap-2">
                {/* VIEW BUTTON */}
                <Link to={`/dashboard/buyer-order-details/${o._id}`}>
                  <button className="btn btn-sm"><MdPageview /></button>
                </Link>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(o._id, o.orderStatus)}
                  className="btn btn-sm btn-error"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerOrder;
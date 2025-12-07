import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const ManageOrder = () => {
  const axiosSecure = useAxios();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // get all pending orders
  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?orderStatus=pending`);
      return res.data;
    }
  });
  console.log(orders);
  

  const handleStatusUpdate = (order, status, rider) => {
    const body = {
      status,
      riderId: rider?._id,
      riderName: rider?.Name,
      riderEmail: rider?.EmailAddress,
      trackingId: order.trackingId
    };

    axiosSecure.patch(`/orders/${order._id}`, body)
      .then(res => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Order ${status}`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
      });
  };

  const handleDelivered = (order) => {
    axiosSecure.patch(`/orders/${order._id}/delivered`, {
      riderId: order.riderId,
      trackingId: order.trackingId
    }).then(res => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order Delivered",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    });
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold mb-4">Manage Orders</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order._id}>
              <td>{idx + 1}</td>
              <td>{order.parcelName}</td>
              <td>
                <span className={`font-semibold ${
                  order.orderStatus === "pending" ? "text-yellow-500" :
                  order.orderStatus === "accepted" ? "text-green-500" :
                  order.orderStatus === "rejected" ? "text-red-500" :
                  "text-gray-500"
                }`}>
                  {order.orderStatus}
                </span>
              </td>
              <td className="space-x-2">
                {order.orderStatus === "pending" && (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleStatusUpdate(order, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleStatusUpdate(order, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {order.orderStatus === "accepted" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleDelivered(order)}
                  >
                    Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;

import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const BuyerOrderProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/orders/by-buyer/${user.email}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);
console.log(orders);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border-b border-white p-4 rounded shadow">
              <p className="border-b border-white"><strong>Product:</strong> {order.productName}</p>
              <p className="border-b border-white"><strong>Quantity:</strong> {order.quantity}</p>
              <p className="border-b border-white"><strong>Total Paid:</strong> ${order.totalPrice}</p>
              <p className="border-b border-white"><strong>Status:</strong> {order.orderStatus}</p>

              {order.trackingLog?.length > 0 && (
                <div className="mt-2">
                  <strong>Tracking:</strong>
                  <ul className="list-disc ml-5">
                    {order.trackingLog.map((t, i) => (
                      <li key={i}>{t.step} - {new Date(t.date).toLocaleString()}</li>
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

export default BuyerOrderProducts;

import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import LoadingPage from "../../../../component/LoadingPage/LoadingPage";

const CompletedOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/orders/completed/by-manager/${user.email}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }
  }, [user?.email]);

  if (!orders) return <LoadingPage />;
  console.log(orders);
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Completed Orders</h2>
      {orders.length === 0 ? (
        <p>No completed orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Buyer:</strong> {order.customerEmail}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total:</strong> ${order.totalPrice}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
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

export default CompletedOrder;

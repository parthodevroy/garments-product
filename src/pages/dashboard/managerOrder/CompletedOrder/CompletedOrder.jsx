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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Completed Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No completed orders yet.</p>
      ) : (
        <div className="overflow-x-auto dash-card shadow rounded-lg">
          <table className="table w-full">
            <thead className="dash-card text-gray-700">
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Buyer</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b">
                  <td className="font-mono text-sm">{order._id}</td>
                  <td>{order.productName}</td>
                  <td>{order.customerEmail}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice}</td>
                  <td className="text-green-600 font-semibold">{order.orderStatus}</td>
                  <td>
                    {order.trackingLog?.length > 0 ? (
                      <ul className="list-disc ml-4 text-sm max-h-48 overflow-y-auto">
                        {order.trackingLog.map((t, i) => (
                          <li key={i}>
                            <span className="font-medium">{t.step}</span> - {new Date(t.date).toLocaleString()}
                            {t.location && ` — ${t.location}`}
                            {t.note && ` — ${t.note}`}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">No tracking info</span>
                    )}
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

export default CompletedOrder;

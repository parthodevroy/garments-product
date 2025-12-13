import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAuth from "../../../hooks/useAuth";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: orders = [], isLoading } = useQuery({
  queryKey: ["user-orders", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/orders/by-buyer/${user.email}`); 
    return res.data;
  },
  enabled: !!user?.email,
});
console.log(orders);


  if (isLoading) return <LoadingPage/>

  // Stats calculation
  const deliveredCount = orders.filter(p => p.orderStatus === "accepted").length;
  const pendingCount = orders.filter(p => p.orderStatus !== "accepted").length;

  const pieData = [
    { name: "Delivered", value: deliveredCount },
    { name: "Pending", value: pendingCount },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Parcel Overview</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Stats Cards */}
        <div className="flex flex-1 gap-6 flex-wrap justify-center">
          <div className="stat-card dash-card shadow-lg rounded-lg p-6 flex items-center gap-4 w-64 hover:shadow-xl transition-shadow">
            <FaCheckCircle className="text-green-500 w-8 h-8" />
            <div>
              <p className="text-green-500 font-semibold">Delivered</p>
              <p className="text-2xl font-bold">{deliveredCount}</p>
            </div>
          </div>
          <div className="stat-card  dash-card shadow-lg rounded-lg p-6 flex items-center gap-4 w-64 hover:shadow-xl transition-shadow">
            <FaClock className="text-orange-500 w-8 h-8" />
            <div>
              <p className="text-gray-500 font-semibold">Pending</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex justify-center flex-1  p-4 rounded-lg shadow-lg">
          <PieChart width={420} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

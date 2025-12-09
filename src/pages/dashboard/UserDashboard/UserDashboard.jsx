import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // Fetch user's parcels
  const { data: parcels = [] } = useQuery({
    queryKey: ["user-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Prepare data for PieChart
  const deliveredCount = parcels.filter(p => p.orderStatus === "accepted").length;
  const pendingCount = parcels.filter(p => p.orderStatus !== "accepted").length;

  const pieData = [
    { name: "Delivered", value: deliveredCount },
    { name: "Pending", value: pendingCount },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-6">Your Parcel Status</h1>

     <div className="flex max-w-6xl mx-auto">
       {/* Stats */}
      <div className="stats h-24 shadow mb-6">
        <div className="stat">
          <div className="stat-title">Delivered</div>
          <div className="stat-value">{deliveredCount}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Pending</div>
          <div className="stat-value">{pendingCount}</div>
        </div>
      </div>

      {/* PieChart */}
      <div className="flex justify-center">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}`}
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

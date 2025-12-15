import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import useAxios from '../../../hooks/useAxios';
import LoadingPage from '../../../component/LoadingPage/LoadingPage';

const ManagerDashboards= () => {
  const axiosSecure = useAxios();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/delivery-status/status");
      return res.data;
    }
  });

  if (isLoading) return <LoadingPage />;

  // PieChart data
  const pieData = stats.map(item => ({
    name: item._id,
    value: item.count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FFF', '#FF6699'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className=" max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manager Dashboard</h1>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mb-10 justify-center">
        {stats.map(stat => (
          <div
            key={stat._id}
            className="dash-card shadow-lg rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 min-w-[150px]"
          >
            <div className="text-gray-500 text-sm font-semibold mb-2">{stat._id}</div>
            <div className="text-3xl font-bold text-gray-800">{stat.count}</div>
          </div>
        ))}
      </div>

      {/* PieChart */}
      <div className="flex justify-center items-center">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={140}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {pieData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value}`, `${name}`]} 
            contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </div>
    </div>
  );
};

export default ManagerDashboards;

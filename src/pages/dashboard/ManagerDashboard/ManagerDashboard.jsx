import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip, Cell } from 'recharts';
import useAuth from '../../../hooks/useAuth';

const ManagerDashboard = () => {
    
  const axiosSecure = useAxios();
const { user } = useAuth();

const { data: deliverd = [] } = useQuery({
  queryKey: ["delivery-status-stats", user.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/manager/delivery-per-day?email=${user.email}`);
    return res.data;
  }
});

console.log(deliverd);

  // Pie chart data
  const pieData = deliverd.map(item => ({
    name: item._id.date, 
    value: item.count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {(percent * 100).toFixed(0) + '%'}
      </text>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Completed Order Dashboard</h1>

      {/* Status show */}
      <div className="stats max-w-full shadow mb-10">
        {deliverd.map(stat => (
          <div key={stat._id.date} className="stat place-items-center">
            <div className="stat-title">{stat._id.date}</div>
            <div className="stat-value">{stat.count}</div>
          </div>
        ))}
      </div>

      {/* PieChart */}
      <div className="flex justify-center h-[500px]">
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
          <Tooltip/>
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </div>
    </div>
  );
};

export default ManagerDashboard;

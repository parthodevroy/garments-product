
import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const AdminDashboard = () => {

    const axiosSecure = useAxios();

    const { data: stats = [] } = useQuery({
        queryKey: ["delivery-status-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders/delivery-status/status");
            return res.data;
        }
    });

    // pichart data fetch
    const pieData = stats.map(item => ({
        name: item._id,
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
            <h1 className="text-2xl font-bold mb-6"> Order Status</h1>

           {/* status show */}
            <div className="stats max-w-full shadow mb-10">
                {stats.map(stat => (
                    <div key={stat._id} className="stat place-items-center">
                        <div className="stat-title">{stat._id}</div>
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

export default AdminDashboard;

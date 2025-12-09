import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { data } from 'react-router';

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // Fetch user's parcels
  const { data: parcels = [] } = useQuery({
    queryKey: ['user-orders', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    }
  });
  console.log(parcels);
  

  // Calculate stats
  const deliveredCount = parcels.filter(p => p.deliveryStatus === 'accepted').length;
  const pendingCount = parcels.filter(p => p.deliveryStatus !== 'accepted').length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Parcel Status Now</h1>

      {/* Stats */}
      <div className="stats shadow mb-6">
        <div className="stat">
          <div className="stat-title">Delivered</div>
          <div className="stat-value">{deliveredCount}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Pending</div>
          <div className="stat-value">{pendingCount}</div>
        </div>
      </div>

      {/* Parcel Table */}
     <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Name</th>
        <th>Cost</th>
        <th>status</th>
        <th>parcel send</th>

      </tr>
    </thead>
    <tbody>
      {parcels.map(data=>
       <tr key={data._id}>
       
        <td>{data.parcelName}</td>
        <td>{data.cost}</td>
        <td>{data.deliveryStatus}</td>
        <td>{data.createdAt}</td>
        
      </tr>
      
      )}
     
    
    </tbody>
  </table>
</div>
    </div>
  );
};

export default UserDashboard;

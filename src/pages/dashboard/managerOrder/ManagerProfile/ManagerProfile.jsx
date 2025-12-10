import React, { useEffect, useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";

const ManagerProfile = () => {
  const { user, signout } = useAuth();
  const axiosSecure = useAxios();
  const [stats, setStats] = useState({
    totalOrders: 0,
    delivered: 0,
    pending: 0,
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/manager/stats/${user.email}`)
        .then(res => setStats(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleLogout = () => {
    signout()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed"));
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6 mb-6">
          <FaUserCircle className="text-gray-700" size={80} />
          <div>
            <h1 className="text-3xl font-bold">{user?.displayName || "Manager"}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Joined: {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="p-5 bg-blue-50 border rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-blue-800">Total Orders</h2>
            <p className="text-4xl font-bold mt-2 text-blue-900">
              {stats.totalOrders}
            </p>
          </div>

          <div className="p-5 bg-green-50 border rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-green-800">Delivered</h2>
            <p className="text-4xl font-bold mt-2 text-green-900">
              {stats.delivered}
            </p>
          </div>

          <div className="p-5 bg-yellow-50 border rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-yellow-800">Pending</h2>
            <p className="text-4xl font-bold mt-2 text-yellow-900">
              {stats.pending}
            </p>
          </div>

        </div>

        {/* Profile Details */}
        <div className="mt-8 p-6 bg-gray-50 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Profile Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p><strong>Name:</strong> {user?.displayName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> Manager</p>
            <p><strong>Status:</strong> Active</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">

          {/* <button className="btn btn-outline btn-info">
            Edit Profile
          </button> */}

          <button 
            onClick={handleLogout}
            className="btn btn-error flex items-center gap-2"
          >
            <FiLogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;

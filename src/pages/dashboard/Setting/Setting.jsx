import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Setting = () => {
  const { user, signout } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);

  const handleLogout = async () => {
    await signout();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile & Settings</h1>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <FaUserCircle className="w-20 h-20 text-gray-400" />
        )}
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName || user?.firstName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500 text-sm">Role: {user?.role}</p>
        </div>
      </div>

      {/* Account Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">Account Information</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">First Name:</span> {user?.firstName || "-"}
          </div>
          <div>
            <span className="font-semibold">Last Name:</span> {user?.lastName || "-"}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user?.email || "-"}
          </div>
          <div>
            <span className="font-semibold">Contact Number:</span> {user?.contactNumber || "-"}
          </div>
          <div>
            <span className="font-semibold">Registered On:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
          </div>
          <div>
            <span className="font-semibold">Delivery Address:</span> {user?.deliveryAddress || "-"}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">Notifications</h2>
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="checkbox checkbox-primary"
          />
          Email Notifications
        </label>
      </div>

      {/* Account Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">Actions</h2>
        {user?.status === "suspended" && (
          <div className="bg-red-100 p-2 rounded border border-red-400 text-sm mb-3">
            Suspended: {user?.suspendReason || "No reason provided"}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 btn btn-red"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;

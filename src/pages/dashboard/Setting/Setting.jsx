import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Setting = () => {
  const { user, signout } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);

  const handleLogout = async () => {
    await signout();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Dashboard Settings</h1>

      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-6">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-16 h-16 text-gray-400" />
        )}
        <div>
          <p className="font-semibold">{user?.displayName}</p>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Account</h2>
        <div className="flex flex-col gap-2">
          {user?.status === "suspended" && (
            <div className="bg-red-100 p-2 rounded border border-red-400 text-sm">
              Suspended: {user?.suspendReason || "No reason provided"}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-red mt-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Notifications</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="checkbox"
          />
          Email Notifications
        </label>
      </div>

      {/* Other Settings */}
      <div>
        <h2 className="font-semibold mb-2">Other</h2>
        <p className="text-gray-600 text-sm">
          Here you can add more dashboard related settings in future.
        </p>
      </div>
    </div>
  );
};

export default Setting;


import React, { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [searchUser, setSearchUser] = useState("");
  const axiosSecure = useAxios();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", searchUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?serceUser=${searchUser}`);
      return res.data;
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Modal state
  const [status, setStatus] = useState("pending");
  const [suspendReason, setSuspendReason] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setStatus(selectedUser.status || "pending");
      setSuspendReason(selectedUser.suspendReason || "");
    } else {
      setStatus("pending");
      setSuspendReason("");
    }
  }, [selectedUser]);

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    if (status === "suspended" && !suspendReason.trim()) {
      return Swal.fire("Error", "Suspend reason is required", "error");
    }

    const payload = {
      status,
      suspendReason: status === "suspended" ? suspendReason.trim() : ""
    };

    try {
      setSaving(true);
      const res = await axiosSecure.patch(`/user/${selectedUser._id}`, payload);
      if (res.data.modified) {
        Swal.fire("Success", "User updated successfully", "success");
        refetch();
        closeModal();
      } else {
        Swal.fire("Info", "No changes were applied", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 text">
      <h1 className="text-2xl font-bold mb-4">User Management ({users.length})</h1>

      {/* Search */}
      <div className="">
        <input
          type="search"
          placeholder="Search by name or email"
          className="input dash text mb-4 w-full max-w-md"
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table dash-card w-full min-w-[600px] md:min-w-full">
          <thead className="pb-2 ">
            <tr className="">

              <th className="border-b border-white">Name</th>
              <th className="border-b border-white">Email</th>
              <th className="border-b border-white">Role</th>
              <th className="border-b border-white">Status</th>
              <th className="border-b border-white">Suspend Reason</th>
              <th className="border-b border-white">Action</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:border-b [&>tr>td]:border-white/50 [&>tr>th]:border-b [&>tr>th]:border-white/50 [&>tr]:my-2">

            {users.map((u) => (
              <tr key={u._id} className="dash-card">

                <td>{u.displayName}</td>
                <td className="">{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <span
                    className={
                      "px-2 py-1 rounded text-sm font-medium capitalize " +
                      (u.status === "approved"
                        ? " text-green-600 "
                        : u.status === "suspended"
                          ? " text-red-600 "
                          : " text-yellow-600")
                    }
                  >
                    {u.status}
                  </span>
                </td>

                <td className="text-red-500">{u.suspendReason || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openUpdateModal(u)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className=" dash-card w-full max-w-lg rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Update: {selectedUser.displayName}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input dash w-full"
                >
                  <option className="text-yellow-400" value="pending">Pending</option>
                  <option className="text-green-500" value="approved">Approved</option>
                  <option className="text-red-500" value="suspended">Suspended</option>
                </select>
              </div>

              {/* Suspend reason */}
              {status === "suspended" && (
                <div>
                  <label className="block text-sm  font-medium mb-1">Suspend Reason</label>
                  <textarea
                    className="input dash text-white w-full"
                    rows={3}
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    placeholder="Enter suspend reason..."
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

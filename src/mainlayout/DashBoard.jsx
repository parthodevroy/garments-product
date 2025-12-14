


import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import LoadingPage from "../component/LoadingPage/LoadingPage";
import {
  MdDashboardCustomize,
  MdOutlineCreateNewFolder,
  MdPendingActions,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { FaHistory, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { GrDeliver } from "react-icons/gr";
import { GiClothes } from "react-icons/gi";
import { IoMdCloudDone, IoMdMenu } from "react-icons/io";
import { MdApproval } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import Logo from "../component/Logo";

export default function DashBoard() {
  const { role, isLoading } = useRole();

  const [open, setOpen] = useState(false);

  if (isLoading || !role) {
    return <LoadingPage />;
  }
console.log(role);


  return (
    <div className="flex min-h-screen sticky text dash">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`h-screen dash text transition-all duration-300
         ${open ? "w-64" : "w-16"} text border-gray-800`}
      >
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-3">
            <Logo />

          </div>
        </Link>

        {/* Menu Items */}
        <ul className="mt-4 space-y-3 px-2 text-sm">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className="flex  items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
            >
              <MdDashboardCustomize size={22} />
              {open && <span>Your Dashboard</span>}
            </Link>
          </li>

          {/* Buyer Role */}
          {role === "Buyer" && (
            <>
              <li>
                <Link
                  to="/dashboard/Buyer-orders"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <MdProductionQuantityLimits size={22} />
                  {open && <span>All Ordered</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/payment-history"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <FaHistory size={20} />
                  {open && <span>Payment History</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/setting"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <ImProfile size={20} />
                  {open && <span>My Profile</span>}
                </Link>
              </li>
            </>
          )}

          {/* Manager Role */}
          {role === "Manager" && (
            <>
              <li>
                <Link
                  to="/productcreated"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <MdOutlineCreateNewFolder size={22} />
                  {open && <span>Created Product</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/manager-created-product"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <SiManageiq size={22} />
                  {open && <span>Manage Product</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/manage-order"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <MdPendingActions size={22} />
                  {open && <span>Pending Order</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/approved-order"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <MdApproval size={22} />
                  {open && <span>Approved Ordered</span>}
                </Link>
              </li>


              <li>
                <Link
                  to="/dashboard/completed-order"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <IoMdCloudDone size={22} />
                  {open && <span>Completed Ordered</span>}
                </Link>
              </li>


              <li>
                <Link
                  to="/dashboard/manager-profile"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <ImProfile size={22} />
                  {open && <span>My Profile</span>}
                </Link>
              </li>
            </>
          )}

          {/* Admin Role */}
          {role?.toLowerCase() === "Admin" && (
            <>
              <li>
                <Link
                  to="/dashboard/user-management"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <FaUsers size={22} />
                  {open && <span>User Management</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/all-products-Admin"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <GiClothes size={22} />
                  {open && <span>All Products</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/all-orders"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <GrDeliver size={22} />
                  {open && <span>All Orders</span>}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* CONTENT */}
      <div className="flex-1 text-white">
        {/* TOP NAVBAR */}
        {/* TOP NAVBAR */}
        <nav className="w-full h-16 dash flex items-center px-6 border-gray-700">
          <IoMdMenu
            size={26}
            className="text-gray-300 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <h1 className="ml-4 text-xl font-semibold text-red-600">
            {role}
          </h1>
        </nav>


        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

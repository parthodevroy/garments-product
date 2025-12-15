
import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import LoadingPage from "../component/LoadingPage/LoadingPage";
import {
  MdDashboardCustomize,
  MdOutlineCreateNewFolder,
  MdPendingActions,
  MdProductionQuantityLimits,
  MdApproval,
} from "react-icons/md";
import { FaHistory, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { GrDeliver } from "react-icons/gr";
import { GiClothes } from "react-icons/gi";
import { IoMdCloudDone, IoMdMenu } from "react-icons/io";
import { SiManageiq } from "react-icons/si";
import Logo from "../component/Logo";

export default function DashBoard() {
  const { role, isLoading } = useRole();
  const [open, setOpen] = useState(false); 
  const [mobileOpen, setMobileOpen] = useState(false); 

  if (isLoading || !role) return <LoadingPage />;

  return (
    <div className="flex min-h-screen text dash">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`h-screen dash text transition-all duration-300
          ${open ? "w-64" : "w-16"} 
          text border-gray-800
          fixed lg:relative z-50 
          ${mobileOpen ? "left-0" : "-left-64"} lg:left-0
        `}
      >
        <div className="flex items-center justify-between p-4">
          <Link to={"/"}>
            <Logo />
          </Link>
          {/* M close button */}
          <button
            className="lg:hidden text-gray-300"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className="mt-4 space-y-3 px-2 text-sm">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
            >
              <MdDashboardCustomize size={22} />
              {open && <span>Your Dashboard</span>}
            </Link>
          </li>

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

          {role === "Manager" && (
            <>
              <li>
                <Link
                  to="/productcreated"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <MdOutlineCreateNewFolder size={22} />
                  {open && <span>Create Product</span>}
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

          {role === "Admin" && (
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

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* CONTENT */}
      <div className="flex-1 text-white lg:ml-0 ml-0">
        {/* TOP NAVBAR */}
        <nav className="w-full h-16 dash flex items-center px-6">
          {/* Hamburger only on mobile */}
          <IoMdMenu
            size={26}
            className="text-gray-300 cursor-pointer lg:hidden"
            onClick={() => setMobileOpen(true)}
          />
          <h1 className="ml-4 text-xl font-semibold text-red-600">{role}</h1>
        </nav>

       
        <div className=" dash h-fit w-[420px] md:w-full lg:w-full lg:pl-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

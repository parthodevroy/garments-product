// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router';
// import useRole from '../hooks/useRole';
// import { SiManageiq, SiRider } from "react-icons/si";
// import LoadingPage from '../component/LoadingPage/LoadingPage';
// import { MdDashboardCustomize, MdOutlineCreateNewFolder, MdPendingActions, MdProductionQuantityLimits } from 'react-icons/md';
// import { FaHistory, FaUsers } from 'react-icons/fa';
// import { ImProfile } from "react-icons/im";
// import { GrDeliver } from "react-icons/gr";
// import { GiClothes } from "react-icons/gi";
// import { IoMdCloudDone, IoMdMenu } from "react-icons/io";
// import { MdApproval } from "react-icons/md";
// import Logo2 from '../component/Logo2';

// const DashBoard = () => {
//   const { role, isLoading } = useRole()

//   if (isLoading) {
//     return (

//       <LoadingPage></LoadingPage>

//     );
//   }
//   // console.log(role);

//   return (


//     <div className="drawer pl-0 lg:pl-12 pt-8 w-full   border-2  lg:drawer-open">
//       <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content">
//         {/* Navbar */}
//         <nav className="navbar w-full pl-8 bg-base-700">
//           <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
//             {/* Sidebar toggle icon */}
//             <IoMdMenu />
//           </label>
//           <div className="px-4 text-2xl font-semibold text-yellow-500">GO&PT System</div>

//         </nav>

//         {/* Page content here */}
//         <Outlet></Outlet>

//       </div>

//       <div className="drawer-side  is-drawer-close:overflow-visible">
//         <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//         <div className="flex  min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//           {/* Sidebar content here */}
//           <ul className="menu w-full dash space-y-4 grow">
//             {/* List item */}

//             <Link to={"/"}><li className='h-10 pb-20 lg-pb-20 w-18'>
//              <Logo2/>

//             </li></Link>
//             <li>
//               <Link to={"/dashboard"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Your Dashbaord">
//                 {/* Home icon */}
//                 <MdDashboardCustomize />
//                 <span className="is-drawer-close:hidden">Your Dashboard</span>

//               </Link>
//             </li>



//             {/* only rider see this page */}
//             {
//               role === "buyer" && <>

//                 <Link to={"/dashboard/buyer-orders"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All-Ordered">

//                       <MdProductionQuantityLimits />
//                       <span className="is-drawer-close:hidden">All Ordered</span>
//                     </button>
//                   </li>
//                 </Link>


//                 <Link to={"/dashboard/payment-history"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
//                       {/* Settings icon */}

//                       <FaHistory></FaHistory>
//                       <span className="is-drawer-close:hidden">Payment History</span>
//                     </button>
//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/setting"}>
//                   <li>
//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My-Profile">
//                       {/* Settings icon */}
//                       <ImProfile />
//                       <span className="is-drawer-close:hidden">My Profile</span>
//                     </button>
//                   </li>
//                 </Link>

//               </>
//             }
//             {
//               role === "Manager" && <>


//                 <Link to={"/productcreated"}>
//                   <li>
//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Created-Products">

//                       <MdOutlineCreateNewFolder/>
//                       <span className="is-drawer-close:hidden">Created Product</span>
//                     </button>
//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/manager-created-product"}>
//                   <li>
//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage-Products">


//                       <SiManageiq />
//                       <span className="is-drawer-close:hidden">Manage Product</span>
//                     </button>
//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/manage-order"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending Order">
//                      <MdPendingActions />
//                       <span className="is-drawer-close:hidden">Pending Order</span>
//                     </button>
//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/completed-order"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Completed-Ordered">
//                      <IoMdCloudDone />
//                       <span className="is-drawer-close:hidden">Completed Ordered</span>
//                     </button>

//                   </li>
//                 </Link>
//                 {/* <Link to={"/dashboard/pending-order"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending-Ordered">
//                       <FaUser />
//                       <span className="is-drawer-close:hidden">Pending Ordered</span>
//                     </button>

//                   </li>
//                 </Link> */}
//                 <Link to={"/dashboard/approved-order"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approved-Ordered">
//                      <MdApproval/>
//                       <span className="is-drawer-close:hidden">Approved Ordered</span>
//                     </button>

//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/manager-profile"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="my-profile">
//                      <ImProfile />
//                       <span className="is-drawer-close:hidden">My-profile</span>
//                     </button>

//                   </li>
//                 </Link>

//               </>
//             }
//             {/* rider appproval section and admin show section  */}
//             {/* only admin can see this section */}
//             {
//               role === "admin" && <>

//                 <Link to={"/dashboard/user-management"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Management">


//                       <FaUsers />
//                       <span className="is-drawer-close:hidden">User Management</span>
//                     </button>

//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/all-products-admin"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Products">


//                       <GiClothes />
//                       <span className="is-drawer-close:hidden">All Products</span>
//                     </button>

//                   </li>
//                 </Link>
//                 <Link to={"/dashboard/all-orders"}>
//                   <li>

//                     <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All-Orders">


//                       <GrDeliver />
//                       <span className="is-drawer-close:hidden">All Orders</span>
//                     </button>

//                   </li>
//                 </Link>
//               </>
//             }




//             {/* List item */}

//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


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
import Logo2 from "../component/Logo2";
import Logo from "../component/Logo";

export default function DashBoard() {
  const { role, isLoading } = useRole();

  const [open, setOpen] = useState(false);

  if (isLoading) return <LoadingPage />;

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
          <Logo/>
         
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
          {role === "buyer" && (
            <>
              <li>
                <Link
                  to="/dashboard/buyer-orders"
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
                  to="/dashboard/completed-order"
                  className="flex items-center gap-4 hover:bg-gray-700/40 p-2 rounded-lg"
                >
                  <IoMdCloudDone size={22} />
                  {open && <span>Completed Ordered</span>}
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
          {role === "admin" && (
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
                  to="/dashboard/all-products-admin"
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
            onClick={() => setOpen(!open)}   // <--- Sidebar toggle by click
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

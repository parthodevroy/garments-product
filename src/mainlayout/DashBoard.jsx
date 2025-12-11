import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import { SiManageiq, SiRider } from "react-icons/si";
import LoadingPage from '../component/LoadingPage/LoadingPage';
import { MdDashboardCustomize, MdOutlineCreateNewFolder, MdPendingActions, MdProductionQuantityLimits } from 'react-icons/md';
import { FaHistory, FaUsers } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import { GrDeliver } from "react-icons/gr";
import { GiClothes } from "react-icons/gi";
import { IoMdCloudDone, IoMdMenu } from "react-icons/io";
import { MdApproval } from "react-icons/md";
import Logo2 from '../component/Logo2';

const DashBoard = () => {
  const { role, isLoading } = useRole()

  if (isLoading) {
    return (

      <LoadingPage></LoadingPage>

    );
  }
  // console.log(role);

  return (
    
    
    <div className="drawer pl-0 lg:pl-12 w-full   border-2  lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full pl-8 bg-base-700">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <IoMdMenu />
          </label>
          <div className="px-4">Navbar Title</div>
          
        </nav>
        
        {/* Page content here */}
        <Outlet></Outlet>

      </div>

      <div className="drawer-side  is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex  min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full space-y-4 grow">
            {/* List item */}

            <Link to={"/"}><li className='h-10 pb-20 lg-pb-20 w-18'>
             <Logo2/>

            </li></Link>
            <li>
              <Link to={"/dashboard"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Your Dashbaord">
                {/* Home icon */}
                <MdDashboardCustomize />
                <span className="is-drawer-close:hidden">Your Dashboard</span>

              </Link>
            </li>



            {/* only rider see this page */}
            {
              role === "buyer" && <>

                <Link to={"/dashboard/buyer-orders"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All-Ordered">

                      <MdProductionQuantityLimits />
                      <span className="is-drawer-close:hidden">All Ordered</span>
                    </button>
                  </li>
                </Link>


                <Link to={"/dashboard/payment-history"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                      {/* Settings icon */}

                      <FaHistory></FaHistory>
                      <span className="is-drawer-close:hidden">Payment History</span>
                    </button>
                  </li>
                </Link>
                <Link to={"/dashboard/setting"}>
                  <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My-Profile">
                      {/* Settings icon */}
                      <ImProfile />
                      <span className="is-drawer-close:hidden">My Profile</span>
                    </button>
                  </li>
                </Link>

              </>
            }
            {
              role === "Manager" && <>


                <Link to={"/productcreated"}>
                  <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Created-Products">

                      <MdOutlineCreateNewFolder/>
                      <span className="is-drawer-close:hidden">Created Product</span>
                    </button>
                  </li>
                </Link>
                <Link to={"/dashboard/manager-created-product"}>
                  <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage-Products">


                      <SiManageiq />
                      <span className="is-drawer-close:hidden">Manage Product</span>
                    </button>
                  </li>
                </Link>
                <Link to={"/dashboard/manage-order"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending Order">
                     <MdPendingActions />
                      <span className="is-drawer-close:hidden">Pending Order</span>
                    </button>
                  </li>
                </Link>
                <Link to={"/dashboard/completed-order"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Completed-Ordered">
                     <IoMdCloudDone />
                      <span className="is-drawer-close:hidden">Completed Ordered</span>
                    </button>

                  </li>
                </Link>
                {/* <Link to={"/dashboard/pending-order"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending-Ordered">
                      <FaUser />
                      <span className="is-drawer-close:hidden">Pending Ordered</span>
                    </button>

                  </li>
                </Link> */}
                <Link to={"/dashboard/approved-order"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approved-Ordered">
                     <MdApproval/>
                      <span className="is-drawer-close:hidden">Approved Ordered</span>
                    </button>

                  </li>
                </Link>
                <Link to={"/dashboard/manager-profile"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="my-profile">
                     <ImProfile />
                      <span className="is-drawer-close:hidden">My-profile</span>
                    </button>

                  </li>
                </Link>

              </>
            }
            {/* rider appproval section and admin show section  */}
            {/* only admin can see this section */}
            {
              role === "admin" && <>

                <Link to={"/dashboard/user-management"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Management">


                      <FaUsers />
                      <span className="is-drawer-close:hidden">User Management</span>
                    </button>

                  </li>
                </Link>
                <Link to={"/dashboard/all-products-admin"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Products">


                      <GiClothes />
                      <span className="is-drawer-close:hidden">All Products</span>
                    </button>

                  </li>
                </Link>
                <Link to={"/dashboard/all-orders"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All-Orders">


                      <GrDeliver />
                      <span className="is-drawer-close:hidden">All Orders</span>
                    </button>

                  </li>
                </Link>
              </>
            }




            {/* List item */}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;



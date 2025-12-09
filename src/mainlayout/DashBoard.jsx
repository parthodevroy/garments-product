import React from 'react';
import { Link, Outlet } from 'react-router';
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaProductHunt, FaUser } from 'react-icons/fa6';
import useRole from '../hooks/useRole';
import { SiRider } from "react-icons/si";
import LoadingPage from '../component/LoadingPage/LoadingPage';
import Logo from '../component/Logo';



const DashBoard = () => {
  const { role, isLoading } = useRole()
  if (isLoading) {
    return (

      <LoadingPage></LoadingPage>

    );
  }
  console.log(role);

  return (
    <div className="drawer max-w-6xl mx-auto lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-700">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>

      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex  min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full space-y-4 grow">
            {/* List item */}

            <Link to={"/"}><li className='w-16'>
              <Logo/>

            </li></Link>
            <li>
              <Link to={"/dashboard"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Your Dashbaord">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Your Dashboard</span>
              </Link>
            </li>


            {/* my parcels */}
            {/* <Link to={"/dashboard/Buyer-products"}>
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My-Products">
               

                <FaProductHunt />
                <span className="is-drawer-close:hidden">My Product</span>
              </button>
            </li>
            </Link> */}

            {/* only rider see this page */}
            {
              role === "Buyer" && <>

               <Link to={"/dashboard/buyer-orders"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My-ordered-products">
                     
                      <RiSecurePaymentFill />
                      <span className="is-drawer-close:hidden">My All Orders</span>
                    </button>
                  </li>
                </Link>

                <Link to={"/dashboard/payment-history"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                      {/* Settings icon */}

                      <RiSecurePaymentFill />
                      <span className="is-drawer-close:hidden">Payment History</span>
                    </button>
                  </li>
                </Link>
               
              </>
            }
            {
              role === "Manager" && <>

               <Link to={"/dashboard/manager-created-product"}>
                  <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage-Products">


                      <FaProductHunt />
                      <span className="is-drawer-close:hidden">Manage Product</span>
                    </button>
                  </li>
                </Link>
                <Link to={"/dashboard/manage-order"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Order">
                      <FaUser />
                      <span className="is-drawer-close:hidden">Manage Products Order</span>
                    </button>
                  </li>
                </Link>
               <Link to={"/dashboard/completed-order"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Completed-Ordered">
                      <FaUser />
                      <span className="is-drawer-close:hidden">Completed Ordered</span>
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


                      <FaUser />
                      <span className="is-drawer-close:hidden">User Management</span>
                    </button>

                  </li>
                </Link>
                <Link to={"/dashboard/all-products-admin"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Products">


                      <SiRider />
                      <span className="is-drawer-close:hidden">All Products</span>
                    </button>

                  </li>
                </Link>
                {/* <Link to={"/dashboard/rider-approval"}>
                  <li>

                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="manager approval">


                      <RiSecurePaymentFill />
                      <span className="is-drawer-close:hidden">Manager approval</span>
                    </button>

                  </li>
                </Link> */}
              </>
            }




            {/* List item */}
           <Link to={"/dashboard/setting"}>
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
           </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

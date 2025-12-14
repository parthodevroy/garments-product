// import React from "react";
// import useRole from "../../../hooks/useRole";
// import ManagerDashboard from "../ManagerDashboard/ManagerDashboard";
// import AdminDashboards from "../AdminDashboard/AdminDashboards";
// import UserDashboards from "../UserDashboard/UserDashboards";
// import LoadingPage from "../../../component/LoadingPage/LoadingPage";


// const DashboardHome = () => {
//   const { role, isLoading } = useRole();

  
//   if (isLoading || !role) {
//     return <LoadingPage/>;
//   }

//   if (role === "admin") {
//     return <AdminDashboards></AdminDashboards>
//   }

//   if (role === "Manager") {
//     return <ManagerDashboard></ManagerDashboard>
//   }

//   return <UserDashboards></UserDashboards>
// };

// export default DashboardHome;
import React from "react";
import useRole from "../../../hooks/useRole";
import ManagerDashboard from "../ManagerDashboard/ManagerDashboard";
import AdminDashboards from "../AdminDashboard/AdminDashboards";
import UserDashboards from "../UserDashboard/UserDashboards";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const DashboardHome = () => {
  const { role, isLoading } = useRole();

  if (isLoading || !role) {
    return <LoadingPage />;
  }

  if (role.toLowerCase() === "admin") {
    return <AdminDashboards />;
  }

  if (role === "Manager") {
    return <ManagerDashboard />;
  }

  return <UserDashboards />;
};

export default DashboardHome;


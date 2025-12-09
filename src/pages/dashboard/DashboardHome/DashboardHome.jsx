import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import UserDashboard from '../UserDashboard/UserDashboard';
import LoadingPage from '../../../component/LoadingPage/LoadingPage';
import ManagerDashboard from '../ManagerDashboard/ManagerDashboard';

const DashboardHome = () => {
    const {role,adminloading}=useRole()

    if (adminloading) {
      
        return <LoadingPage></LoadingPage>
        
    }
   if (role === "admin" || role === "Manager") {
    return <AdminDashboard />;
}

    // else if (role==="Manager") {
    //     return <ManagerDashboard></ManagerDashboard>
    // }
    else{
 return <UserDashboard></UserDashboard>
    }
   
};

export default DashboardHome;
import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import RiderDashboard from '../RiderDashboard/RiderDashboard';
import UserDashboard from '../UserDashboard/UserDashboard';
import LoadingPage from '../../../component/LoadingPage/LoadingPage';

const DashboardHome = () => {
    const {role,adminloading}=useRole()

    if (adminloading) {
      
        return <LoadingPage></LoadingPage>
        
    }
    if (role ==="admin") {
        return <AdminDashboard></AdminDashboard>
        
    }
    else if (role==="rider") {
        return <RiderDashboard></RiderDashboard>
    }
    else{
 return <UserDashboard></UserDashboard>
    }
   
};

export default DashboardHome;
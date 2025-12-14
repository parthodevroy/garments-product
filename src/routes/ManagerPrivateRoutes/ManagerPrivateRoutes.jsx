import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import LoadingPage from '../../component/LoadingPage/LoadingPage';


const ManagerPrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, Adminloading } = useRole();

  if (loading || Adminloading) {
    return (
    <LoadingPage></LoadingPage>
    );
  }
  console.log(user);
  

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Not an Admin
  if (role !== "Manager") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ManagerPrivateRoutes;

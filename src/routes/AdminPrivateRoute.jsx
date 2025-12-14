import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingPage from '../component/LoadingPage/LoadingPage';

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, Adminloading } = useRole();

  if (loading || Adminloading) {
    return (
    <LoadingPage></LoadingPage>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Not an Admin
  if (role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminPrivateRoute;

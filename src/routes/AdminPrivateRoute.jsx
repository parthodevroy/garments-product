import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, Adminloading } = useRole();

  if (loading || Adminloading) {
    return (
      <button className="btn btn-square">
        <span className="loading loading-spinner"></span>
      </button>
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

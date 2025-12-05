import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, adminloading } = useRole();

  if (loading || adminloading) {
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

  // Not an admin
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminPrivateRoute;

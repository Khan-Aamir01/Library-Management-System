import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAdminLogin = !!localStorage.getItem("adminAuth");
  return isAdminLogin ? element : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;

// src/components/common/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

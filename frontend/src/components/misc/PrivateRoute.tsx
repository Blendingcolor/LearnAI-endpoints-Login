import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/UseAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { userIsAuthenticated } = useAuth();

  return userIsAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

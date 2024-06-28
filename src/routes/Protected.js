import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to='/login' />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

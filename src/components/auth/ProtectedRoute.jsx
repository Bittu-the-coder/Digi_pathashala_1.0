import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Layout from "../layout/Layout";

const ProtectedRoute = ({ requiredRole, redirectPath = "/choose-user" }) => {
  const { currentUser, loading, isStudent, isAdmin } = useAuth();

  // If auth is still loading, don't render anything yet
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check role requirements if specified
  if (requiredRole) {
    if (
      (requiredRole === "admin" && !isAdmin) ||
      (requiredRole === "student" && !isStudent)
    ) {
      // Redirect students trying to access admin routes and vice versa
      const redirectTo = isStudent ? "/student/dashboard" : "/admin/dashboard";
      return <Navigate to={redirectTo} replace />;
    }
  }

  // If authenticated and passes role check, render the layout with child routes
  return (
    <Layout role={requiredRole}>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;

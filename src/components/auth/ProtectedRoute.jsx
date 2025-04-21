import { Navigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import Layout from "../layout/Layout";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useData();

  if (!user) {
    return <Navigate to="/choose-user" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <Layout role={user.role}>{children}</Layout>;
};

export default ProtectedRoute;

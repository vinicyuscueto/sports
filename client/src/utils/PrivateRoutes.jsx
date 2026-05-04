import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { session, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!session) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;

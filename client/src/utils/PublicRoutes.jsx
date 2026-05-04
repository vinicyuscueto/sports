import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;

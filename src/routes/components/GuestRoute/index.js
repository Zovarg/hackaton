import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function GuestRoute({ children, ...rest }) {
  const auth = useAuth();
  return auth.user ? <Navigate to={"/posts"} /> : children;
}

export default GuestRoute;

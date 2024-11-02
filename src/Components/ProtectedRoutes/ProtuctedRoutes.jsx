import { Navigate } from "react-router-dom";

export default function ProtuctedRoutes(props) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    <Navigate to="/Login"></Navigate>;
  }
}

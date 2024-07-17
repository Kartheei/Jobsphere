import { useContext } from "react";

import PropTypes from "prop-types"; // Import PropTypes
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();

  // Allow access to home pages for both candidates and employers without logging in
  if (location.pathname === "/" || location.pathname === "/employer") {
    if (isAuthenticated && user && !allowedRoles.includes(user.role)) {
      return <Navigate to={user.role === "Candidate" ? "/" : "/employer"} />;
    }
    return children;
  }

  // Redirect to signin page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }

  // Redirect to home page if user does not have the required role
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

RoleProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Validate allowedRoles prop
};

export default RoleProtectedRoute;

import { createContext, useState, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("jwt");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};
// import { createContext, useState, useEffect } from "react";

// import axios from "axios";
// import Cookies from "js-cookie";
// import PropTypes from "prop-types"; // Import PropTypes

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true by default
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false); // Set to false to skip loading state

//   // useEffect(() => {
//   //   const checkAuth = async () => {
//   //     try {
//   //       const response = await axios.get("/api/auth/check", {
//   //         withCredentials: true,
//   //       });
//   //       setIsAuthenticated(response.data.isAuthenticated);
//   //       setUser(response.data.user);
//   //     } catch (error) {
//   //       setIsAuthenticated(false);
//   //       setUser(null);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   checkAuth();
//   // }, []);

//   const login = (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const logout = async () => {
//     await axios.post("/api/auth/logout", {}, { withCredentials: true });
//     setIsAuthenticated(false);
//     setUser(null);
//     Cookies.remove("jwt");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, user, login, logout, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired, // Validate children prop
// };

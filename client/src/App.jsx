import { useContext } from "react";

import { Spinner } from "@chakra-ui/react"; // Import Spinner
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/styles/style.css";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import routes from "./routesConfig"; // Import routes

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="app-spinner">
        <Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            index={route.index}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

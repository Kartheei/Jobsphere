import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import CandidateHome from "./pages/candidate/Home";
import EmployerHome from "./pages/employer/Home";
import Profile from "./pages/candidate/Profile";
import JobDisplay from "./pages/candidate/JobDisplay";
import JobCreation from "./pages/employer/JobCreation";
import Signin from "./pages/common/Signin";
import ForgotPassword from "./pages/common/ForgotPassword";
import Signup from "./pages/common/Signup";
import RoleProtectedRoute from "./context/RoleProtectedRoute"; // RoleProtectedRoute
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import { Spinner } from "@chakra-ui/react"; // Import Spinner

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
        {/* Route for candidate */}
        <Route path="/">
          <Route
            index
            element={
              <RoleProtectedRoute allowedRoles={["Candidate"]}>
                <CandidateHome />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={["Candidate"]}>
                <Profile />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <RoleProtectedRoute allowedRoles={["Candidate"]}>
                <JobDisplay />
              </RoleProtectedRoute>
            }
          />
        </Route>

        {/* Route for employer */}
        <Route path="/employer">
          <Route
            index
            element={
              <RoleProtectedRoute allowedRoles={["Employer"]}>
                <EmployerHome />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="job-creation"
            element={
              <RoleProtectedRoute allowedRoles={["Employer"]}>
                <JobCreation />
              </RoleProtectedRoute>
            }
          />
        </Route>

        {/* Route for authentication */}
        <Route path="/auth">
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

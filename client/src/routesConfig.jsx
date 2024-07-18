import RoleProtectedRoute from "./context/RoleProtectedRoute";
import CandidateHome from "./pages/candidate/Home";
import JobDisplay from "./pages/candidate/JobDisplay";
import Profile from "./pages/candidate/Profile";
import ForgotPassword from "./pages/common/ForgotPassword";
import Signin from "./pages/common/Signin";
import Signup from "./pages/common/Signup";
import EmployerHome from "./pages/employer/Home";
import JobCreation from "./pages/employer/JobCreation";
import JobDetailsUpdate from "./pages/employer/JobDetailsUpdate";
import JobPostedDetails from "./pages/employer/JobPostedDetails";
import JobDetails from "./pages/candidate/JobDetails";
import JobApplied from "./pages/candidate/JobApplied";
import JobPosted from "./pages/employer/JobPosted";


const routes = [
  // Candidate routes
  {
    path: "/",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <CandidateHome />
      </RoleProtectedRoute>
    ),
    index: true,
  },
  {
    path: "/profile",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <Profile />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/jobs",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <JobDisplay />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/jobDetails",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <JobDetails />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/jobApplied",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <JobApplied />
      </RoleProtectedRoute>
    ),
  },

  // Employer routes
  {
    path: "/employer",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <EmployerHome />
      </RoleProtectedRoute>
    ),
    index: true,
  },
  {
    path: "/employer/job-creation",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <JobCreation />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/employer/jobPosted",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <JobPosted />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/employer/jobPostedDetails",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <JobPostedDetails />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/employer/jobs/:id/edit",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <JobDetailsUpdate />
      </RoleProtectedRoute>
    ),
  },

  // Authentication routes
  {
    path: "/auth/signin",
    element: <Signin />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
];

export default routes;

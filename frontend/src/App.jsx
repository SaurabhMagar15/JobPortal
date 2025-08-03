import AdminJobs from "./components/Admin/AdminJobs";
import Applicants from "./components/Admin/Applicants";
import Companies from "./components/Admin/Companies";
import CompanyCreate from "./components/Admin/CompanyCreate";
import CompanySetup from "./components/Admin/CompanySetup";
import PostJob from "./components/Admin/PostJob";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Browse from "./components/Browse";
import Home from "./components/Home";
import JobDescription from "./components/JobDescription";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

  },

  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/signup",
    element: <Signup />,
  }, {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  //admin
  {
    path: "/admin/companies",
    element:<ProtectedRoute>
      <Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element:<ProtectedRoute>
     <CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element:
    <ProtectedRoute> <CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element:<ProtectedRoute> <AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/job/create",
    element:
    <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: 
    <ProtectedRoute>
      <Applicants />
    </ProtectedRoute>
  },
  

]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

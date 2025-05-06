import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MainDashboard from "./pages/dashboard/user/main/MainDashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/dashboard/user/profile/Profile";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./pages/dashboard/admin/main/AdminDashboard";
import AdminProfile from "./pages/dashboard/admin/profile/AdminProfile";
import KelolaUser from "./pages/dashboard/admin/kelola-user/KelolaUser";

// Protected route for regular users
const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const userData = useSelector((state: any) => state.userData.value);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const isAdminInSession = sessionStorage.getItem("isAdmin") === "true";

  // Check both sources for admin status
  const isAdmin = userData?.isAdmin === true || isAdminInSession;

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  if (!isAdmin) {
    return <Navigate to='/main' />;
  }

  return <>{children}</>;
};

const Routing = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/'
        element={
          <Navigate
            to='/main'
            replace
          />
        }
      />

      {/* User Routes */}
      <Route
        element={
          <ProtectedUserRoute>
            <Dashboard />
          </ProtectedUserRoute>
        }
      >
        <Route
          path='main'
          element={<MainDashboard />}
        />
        <Route
          path='profile'
          element={<Profile />}
        />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }
      >
        <Route
          path='admin/main'
          element={<AdminDashboard />}
        />
        <Route
          path='admin/profile'
          element={<AdminProfile />}
        />
        <Route
          path='admin/kelola-user'
          element={<KelolaUser />}
        />
      </Route>

      {/* Catch-all route for non-existent paths */}
      <Route
        path='*'
        element={
          <Navigate
            to='/main'
            replace
          />
        }
      />
    </Routes>
  );
};

export default Routing;

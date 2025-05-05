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

const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: any) => state.userData.value);

  return user ? <>{children} </> : <Navigate to='/login' />;
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
      <Route
        element={
          <ProtectedUserRoute>
            <Dashboard />
          </ProtectedUserRoute>
        }
      >
        {/* User */}
        <Route
          index
          path='main'
          element={<MainDashboard />}
        />
        <Route
          path='profile'
          element={<Profile />}
        />
        {/* Admin */}
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
    </Routes>
  );
};

export default Routing;

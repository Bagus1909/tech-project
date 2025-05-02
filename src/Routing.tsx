import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MainDashboard from "./pages/dashboard/user/main/MainDashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/dashboard/user/profile/Profile";
import { ReactNode, use } from "react";
import { useSelector } from "react-redux";

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
        <Route
          index
          path='main'
          element={<MainDashboard />}
        />
        <Route
          path='profile'
          element={<Profile />}
        />
      </Route>
    </Routes>
  );
};

export default Routing;

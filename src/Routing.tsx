import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MainDashboard from "./pages/dashboard/user/main/MainDashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/dashboard/user/profile/Profile";

// const ProtectedUserRoute = ()=> {
//   const user
// }

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
      <Route element={<Dashboard />}>
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

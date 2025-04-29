import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Dashboard />}
      />
    </Routes>
  );
};

export default Routing;

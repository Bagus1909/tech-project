import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slice/userData";

import { ReactNode } from "react";

const AppInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      dispatch(setUserData(JSON.parse(userData)));
    }
  }, [dispatch]);

  return children;
};

export default AppInitializer;

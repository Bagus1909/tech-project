import { useEffect, useState } from "react";

export interface IUser {
  key: string | number;
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  tags: string[];
}

const useGetAllUser = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const getUser = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "users");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log("User data kelola data:", data);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user };
};

export default useGetAllUser;

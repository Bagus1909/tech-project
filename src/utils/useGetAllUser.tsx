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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "users");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log("User data kelola data:", data);
      setUser(data);
      setError(null);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Empty dependency array to ensure it only runs once on mount

  return { user, loading, error, refetch: getUser };
};

export default useGetAllUser;

"use client";

import { User } from "@/index";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  login: (email:string, password:string, name:string,) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const router = useRouter()

  // Fetch the user when the app starts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await account.get();
        setUser({
          email: userDetails.email,
          id: userDetails.$id,
          name: userDetails.name
                
        });
      } catch (error) {
        setUser(null); // If no valid session, set user to null
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string, name: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser({
        id: user.$id,
        email: user.email,
        name: user.name,
      });
      console.log("User logged in:", user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null); // Clear user state
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
export default UserProvider;

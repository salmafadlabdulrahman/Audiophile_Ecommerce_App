"use client";

import { LoggedInUser, User } from "@/index";
import { account } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

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

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
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

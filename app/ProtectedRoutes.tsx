'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {isAuthenticated} from "../lib/appwrite";

const ProtectedRoutes = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/sign-up");
      }
    };
    
    checkAuth();
  }, [router]);

  return children;
};

export default ProtectedRoutes;

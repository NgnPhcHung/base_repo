"use client"

import { ISingleResult } from "@packages/models";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const saveToken = (data?: ISingleResult<{ access_token: string }>) => {
    if (data?.data?.access_token) {
      localStorage.setItem("access_token", data.data.access_token);
      return;
    }
    // router.push("/auth/login");
  };

  return {
    isAuthenticated,
    saveToken
  };
}

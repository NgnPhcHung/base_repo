import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Use null to represent loading state

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
}

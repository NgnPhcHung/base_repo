"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";

interface IAppContext {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  let refreshInterval: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    startTokenRefreshCheck();
    if (token) {
      setAuthToken(token);
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, []);

  const refreshToken = async () => {
    try {
      const token = sessionStorage.getItem("access_token");

      const response = await fetch(
        "http://localhost:3456/v1/api/auth/session/refresh",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const { access_token } = await response.json();
      if (!!access_token ) {
        return access_token;
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const startTokenRefreshCheck = () => {
    if (refreshInterval) clearInterval(refreshInterval);

    refreshInterval = setInterval(async () => {
      const token = sessionStorage.getItem("access_token");
      if (!token) return;

      const jwtPayload = JSON.parse(atob(token.split(".")[1]));
      const expiresAt = jwtPayload.exp * 1000;
      const timeLeft = expiresAt - Date.now();

      if (timeLeft < 60 * 1000) {
        const accessToken = await refreshToken();

        sessionStorage.setItem("access_token", accessToken);
        setAuthToken(accessToken);
        clearInterval(refreshInterval);
        startTokenRefreshCheck();
      }
    }, 20 * 1000);
  };

  return (
    <AppContext.Provider value={{ authToken, setAuthToken }}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext) as IAppContext;

"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { SocketIOProvider } from "./SocketIOProvider";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

interface IAppContext {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  let refreshInterval: NodeJS.Timeout | undefined = undefined;
  const router = useRouter();

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

      const {
        data: { access_token },
      } = await response.json();
      if (!!access_token) {
        return access_token;
      } else {
        console.error("Failed to refresh token");
        sessionStorage.removeItem("access_token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      sessionStorage.removeItem("access_token");
    }
  };

  const startTokenRefreshCheck = () => {
    if (refreshInterval) clearInterval(refreshInterval);

    refreshInterval = setInterval(async () => {
      const token = sessionStorage.getItem("access_token");
      if (!token) return;

      try {
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
      } catch (error) {
        console.log(error);
        sessionStorage.removeItem("access_token");
        router.push("/auth/login");
      }
    }, 20 * 1000);
  };

  return (
    <AppContext.Provider value={{ authToken, setAuthToken }}>
      <ReactQueryProvider>
        <SocketIOProvider namespace="friends">
          <MantineProvider defaultColorScheme="light">
            <Notifications />
            {children}
          </MantineProvider>
        </SocketIOProvider>
      </ReactQueryProvider>
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext) as IAppContext;

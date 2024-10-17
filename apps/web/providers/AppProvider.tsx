"use client";

import { useAuth } from "@/hooks";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { SocketIOProvider } from "./SocketIOProvider";

interface IAppContext {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
  }, [isAuthenticated, router]);

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

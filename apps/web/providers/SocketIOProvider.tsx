/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { toast } from "@/components";
import { SocketError } from "@/types";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  error?: SocketError;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
  namespace: string;
}

export const SocketIOProvider: React.FC<SocketProviderProps> = ({
  children,
  namespace,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const handleError = useCallback((error: any) => {
    toast.error(error.message);
  }, []);

  useEffect(() => {
    const newSocket = io(`http://localhost:3456/${namespace}`, {
      transports: ["websocket"],
      autoConnect: true,
    });

    setSocket(newSocket);
    newSocket.connect();
    newSocket.on("error", handleError);

    return () => {
      newSocket.close();
      newSocket.disconnect();
      newSocket.off("error", handleError);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

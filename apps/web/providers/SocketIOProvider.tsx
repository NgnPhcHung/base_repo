"use client"

import { useAuth } from "@/hooks";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

interface ISocketIOContext {
  socket?: Socket;
}

const SocketIOContext = createContext<ISocketIOContext>({});

export const SocketIOProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket>();
  const {isAuthenticated} = useAuth()
  useEffect(() => {
    if(!isAuthenticated) return  
    const newSocket = io(process.env.BASE_URL as string);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketIOContext.Provider value={{ socket }}>
      {children}
    </SocketIOContext.Provider>
  );
};
export const useSocket = (): ISocketIOContext => {
  const context = useContext(SocketIOContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

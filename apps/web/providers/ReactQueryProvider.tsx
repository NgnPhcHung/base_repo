"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

interface ReactQueryProviderProps extends PropsWithChildren {}

export const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

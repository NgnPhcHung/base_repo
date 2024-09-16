"use client";

import { useAuth } from "@/hooks";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Home({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Welcome to the Home Page
      <Button>Get Me</Button>
    </div>
  );
}

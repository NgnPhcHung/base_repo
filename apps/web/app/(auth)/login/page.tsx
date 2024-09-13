"use client";

import { authService } from "@/services";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const authApi = authService();
  const router = useRouter();
  const handleLogin = async () => {
    const res: any = await authApi.login();

    if (res) {
      sessionStorage.setItem("access_token", res.access_token);
      router.push("/");
    }
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

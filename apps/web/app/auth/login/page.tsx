"use client";

import { useAuth } from "@/hooks";
import { authService } from "@/services";
import { Button, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserLoginBody } from "@repo/schemas";

export default function LoginPage() {
  const authApi = authService();
  const { saveToken } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginBody>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: UserLoginBody) => {
      const res: any = await authApi.login(data);

      if (res) {
        saveToken(res);
        router.push("/");
      }
    },
  });

  const handleLogin: SubmitHandler<UserLoginBody> = async (data) => {
    mutate(data);
  };

  return (
    <div className="p-8 bg-gray-400/35 rounded-sm w-96">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <TextInput
          className="w-full"
          {...register("username")}
          label="Username"
          error={errors.username?.message}
          autoFocus
        />

        <TextInput
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <div className="flex items-center justify-between">
          <Link href={"register"}>Create an account</Link>
          <Button type="submit" loading={isPending}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";
import { UserProfileContainer } from "@/components";
import { currentUser } from "@/store";
import { Avatar } from "@mantine/core";

export default function MePage() {
  const { user } = currentUser((state) => ({ user: state.user }));

  return <UserProfileContainer />;
}

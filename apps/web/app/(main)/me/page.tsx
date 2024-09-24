"use client";
import { currentUser } from "@/store";
import { Avatar } from "@mantine/core";

export default function MePage() {
  const { user } = currentUser((state) => ({ user: state.user }));

  return (
    <div>
      <div className="flex items-center space-x-6">
        <Avatar color="blue" size="xl">
          {user?.fullName
            ?.split(" ")
            .map((word) => word[0])
            .join("")}
        </Avatar>
        <p className="font-semibold">{user?.fullName}</p>
      </div>
    </div>
  );
}

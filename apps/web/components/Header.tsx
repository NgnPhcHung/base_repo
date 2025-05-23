import { currentUser } from "@/store";
import { Avatar } from "@mantine/core";
import Link from "next/link";

export const Header = () => {
  const { user } = currentUser((state) => ({ user: state.user }));

  return (
    <Link href={'/me'}>
      <div className="p-4">
        <Avatar color="blue" radius="xl">
          {user?.fullName
            ?.split(" ")
            .map((word) => word[0])
            .join("")}
        </Avatar>
      </div>
    </Link>
  );
};

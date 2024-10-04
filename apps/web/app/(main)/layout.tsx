"use client";
import { Header, Loading, Sidebar, toast } from "@/components";
import { sidebarItem } from "@/components/sidebar/sidebarItem";
import { FriendEvents } from "@/consts";
import { useAuth } from "@/hooks";
import { queryClient, useSocket } from "@/providers";
import { friendService, userService } from "@/services";
import { currentUser } from "@/store";
import { AppShell } from "@mantine/core";
import { UserRole } from "@repo/schemas";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const OPENED = 300;
const CLOSED = 56;

export default function MainLayout({ children }: PropsWithChildren) {
  const { isSidebarOpened, setUser } = currentUser((state) => ({
    isSidebarOpened: state.sidebarOpen,
    setUser: state.setUser,
  }));
  const userApi = userService();

  const { isAuthenticated } = useAuth();
  const { socket } = useSocket();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["user-me"],
    queryFn: userApi.me,
  });

  useEffect(() => {
    if (isAuthenticated && !!data) {
      setUser(data);
    }

    if (data?.role === UserRole.User) {
      router.push("market");
    }
  }, [isAuthenticated, data, setUser, router]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Loading />
      </div>
    );
  }

  socket?.on("connect", () => {
    socket.emit("joinRoom", { room: data?.id });
  });
  socket?.on(FriendEvents.ReceiveFriendRequest, () => {
    toast.info("You have new friend request!");
    queryClient.invalidateQueries({ queryKey: ["list-friend-requests"] });
  });

  socket?.on(FriendEvents.AcceptFriendRequest, () => {
    toast.info("You have new friend request!");
    queryClient.invalidateQueries({ queryKey: ["list-friend"] });
  });

  return (
    <AppShell
      navbar={{
        width: isSidebarOpened ? OPENED : CLOSED,
        breakpoint: "sm",
        collapsed: { mobile: !isSidebarOpened },
      }}
    >
      <AppShell.Header>
        <div className="flex items-center justify-end">
          <Header />
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar items={sidebarItem} />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="p-10 mt-[80px]">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}

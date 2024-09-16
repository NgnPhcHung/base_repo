"use client";
import { Sidebar } from "@/components";
import { sidebarItem } from "@/components/sidebar/sidebarItem";
import { useAuth } from "@/hooks";
import { useSocket } from "@/providers";
import { userService } from "@/services";
import { currentUser } from "@/store";
import { AppShell } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
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

  const { data } = useQuery({
    queryKey: ["user-me"],
    queryFn: userApi.me,
  });
  useEffect(() => {
    if (isAuthenticated && !!data?.data) {
      setUser(data.data);
    }
  }, [isAuthenticated, data, setUser]);

  useEffect(() => {
    socket?.on("connect", () => {
      socket.emit("joinRoom", { room: data?.data?.id });
    });
    socket?.on("receiveFriendRequest", (data) => {
      console.log("Friend request received:", data);
    });
  }, [socket, data]);
  return (
    <AppShell
      navbar={{
        width: isSidebarOpened ? OPENED : CLOSED,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar>
        <Sidebar items={sidebarItem} />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="p-10">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}

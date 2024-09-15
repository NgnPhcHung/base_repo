"use client";
import { Sidebar } from "@/components";
import { sidebarItem } from "@/components/sidebar/sidebarItem";
import { currentUser } from "@/store";
import { AppShell } from "@mantine/core";
import { PropsWithChildren } from "react";
const OPENED = 300;
const CLOSED = 56;
export default function MainLayout({ children }: PropsWithChildren) {
  const { isSidebarOpened } = currentUser((state) => ({
    isSidebarOpened: state.state.sidebarOpen,
  }));
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
      <AppShell.Main >
        <div className="p-10">
        {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

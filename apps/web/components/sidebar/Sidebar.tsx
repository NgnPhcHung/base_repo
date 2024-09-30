

import { currentUser } from "@/store";
import { Burger, NavLink } from "@mantine/core";
import clsx from "clsx";
import { ReactNode } from "react";

export interface SidebarItem {
  label: string;
  url: string;
  expandIcon: ReactNode;
  collapseIcon: ReactNode;
}

interface SidebarProps {
  classNames?: {
    wrapper?: string;
  };
  items: SidebarItem[];
}

export const Sidebar = ({ items, classNames }: SidebarProps) => {
  const { setState, isSidebarOpened } = currentUser((state) => ({
    setState: state.setState,
    isSidebarOpened: state.sidebarOpen,
  }));
  return (
    <div
      className={clsx(
        "h-screen bg-gray-200 flex items-center",
        classNames?.wrapper
      )}
    >
      <Burger
        className="absolute top-2 right-2"
        onClick={() => setState({ sidebarOpen: !isSidebarOpened })}
        aria-label="toggle-sidebar"
        opened={isSidebarOpened}
        size="sm"
      />
      <div>
        {items.map((item) => (
          <NavLink
            key={item.label}
            href={item.url}
            leftSection={isSidebarOpened ? item.expandIcon : item.collapseIcon}
            label={isSidebarOpened ? item.label : undefined}
            // active={currentPage === item.url}
            className={clsx(!isSidebarOpened && "flex items-center")}
            classNames={{
              label: "font-semibold text-lg",
            }}
          />
        ))}
      </div>
    </div>
  );
};

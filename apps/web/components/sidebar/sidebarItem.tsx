import { IconUsersGroup } from "@tabler/icons-react";
import { SidebarItem } from "./Sidebar";

export const sidebarItem: SidebarItem[] = [
  {
    expandIcon: <IconUsersGroup size={20}/>,
    collapseIcon: <IconUsersGroup size={30}/>,
    label: "Fiends",
    url: "friend",
  },
];

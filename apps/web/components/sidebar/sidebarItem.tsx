import { IconBox, IconShoppingBag, IconUsersGroup } from "@tabler/icons-react";
import { SidebarItem } from "./Sidebar";

export const sidebarItem: SidebarItem[] = [
  {
    expandIcon: <IconUsersGroup size={20}/>,
    collapseIcon: <IconUsersGroup size={30}/>,
    label: "Fiends",
    url: "/friend",
  },
  {
    expandIcon: <IconBox size={20}/>,
    collapseIcon: <IconBox size={30}/>,
    label: "Inventories",
    url: "/inventory",
  },
  {
    expandIcon: <IconShoppingBag size={20}/>,
    collapseIcon: <IconShoppingBag size={30}/>,
    label: "Marketplace",
    url: "/market",
  },
];

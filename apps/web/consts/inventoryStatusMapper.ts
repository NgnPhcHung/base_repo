import { MantineColor } from "@mantine/core";
import { InventoryStatus } from "@packages/models";

export const inventoryStatusMapper: Record<InventoryStatus, MantineColor> = {
  Expired: "red",
  Published: "blue",
  Unpublished: "gray",
  Removed: "red.3",
  ZeroStock: "yellow",
};

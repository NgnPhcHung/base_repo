import { apiService } from "@/apis";
import {
  Inventory,
  InventoryFilterParams,
  IPaginationResult,
} from "@packages/models";

export const inventoryService = () => {
  return {
    async getInventories(filter: InventoryFilterParams) {
      return apiService
        .get<IPaginationResult<Inventory>>("inventory", filter)
    },
  };
};

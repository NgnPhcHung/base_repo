import { apiService } from "@/apis";
import {
  Category,
  Inventory,
  InventoryFilterParams,
  ManyResult,
  PaginationResult,
  SingleResult,
} from "@packages/models";

export const marketService = () => {
  return {
    async getListCategory() {
      return apiService.get<ManyResult<Category>>("/market/list-category");
    },
    async getListItems(payload: InventoryFilterParams) {
      return apiService.get<PaginationResult<Inventory>>(
        "/market/list-item",
        payload
      );
    },
    async getSelectedItem(itemId: number) {
      return apiService.get<SingleResult<Inventory>>("/market/item", {itemId});
    },
  };
};

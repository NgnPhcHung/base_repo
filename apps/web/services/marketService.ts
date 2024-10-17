import { apiService } from "@/apis";
import {
  Category,
  Inventory,
  InventoryFilterParams,
  ManyResult,
  Order,
  PaginationResult,
  MarketCreationBody,
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

    async createOrder(payload: MarketCreationBody) {
      return apiService.post<SingleResult<Order>>("/market/items", payload);
    },
  };
};

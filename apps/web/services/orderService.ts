import { apiService } from "@/apis";
import {
  Category,
  Inventory,
  InventoryFilterParams,
  ManyResult,
  Order,
  PaginationResult,
  PurchaseOrderCreationBody,
  SingleResult,
} from "@packages/models";

export const orderService = () => {
  return {
    async getListCategory() {
      return apiService.get<ManyResult<Category>>("/order/list-category");
    },
    async getListItems(payload: InventoryFilterParams) {
      return apiService.get<PaginationResult<Inventory>>(
        "/order/list-item",
        payload
      );
    },
    async getSelectedItem(itemId: number) {
      return apiService.get<SingleResult<Inventory>>("/order/item", {
        itemId,
      });
    },
    async createOrder(payload: PurchaseOrderCreationBody) {
      return apiService.post<SingleResult<Order>>("/order/items", payload);
    },
  };
};

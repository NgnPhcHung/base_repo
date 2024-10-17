import { apiService } from "@/apis";
import {
  Inventory,
  MarketFilterParams,
  PaginationResult,
  SingleResult,
} from "@packages/models";

export const marketItemService = () => {
  return {
    async updateView(itemId: number) {
      return apiService.put<SingleResult<Inventory>>(`/market-items/${itemId}`);
    },
    async getItem(itemId: number) {
      return apiService.get<SingleResult<Inventory>>(`/market-items/detail/${itemId}`);
    },
    async getMostViewedItems(filter: MarketFilterParams) {
      return apiService.get<PaginationResult<Inventory>>(
        "/market-items/most-viewed",
        filter
      );
    },
  };
};

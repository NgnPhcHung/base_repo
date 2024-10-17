import { marketService } from "@/services/marketService";
import { InventoryFilterParams } from "@packages/models";
import { useQuery } from "@tanstack/react-query";

export const useMarket = () => {
  const marketApi = marketService();
  return {
    listCategory: useQuery({
      queryKey: ["list-category"],
      queryFn: marketApi.getListCategory,
    }),
    listItems: (filter: InventoryFilterParams) =>
      useQuery({
        queryKey: ["list-items", filter],
        queryFn: () => marketApi.getListItems(filter!),
        enabled: !!filter.categoryId,
      }),
  };
};

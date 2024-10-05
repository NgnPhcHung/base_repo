import { orderService } from "@/services/orderService";
import { InventoryFilterParams } from "@packages/models";
import { useQuery } from "@tanstack/react-query";

export const useMarket = () => {
  const marketApi = orderService();
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

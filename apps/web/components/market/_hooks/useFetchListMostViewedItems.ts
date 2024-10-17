import { useMarketItemFilter } from "@/components/product-detail/_hooks/useMarketItemFilter";
import { marketItemService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useFetchListMostViewedItems = () => {
  const { filter } = useMarketItemFilter();
  const marketItemApi = marketItemService();

  const { data: mostViewedItems, isLoading: isMostViewedLoading } = useQuery({
    queryKey: ["most-viewed-items", filter],
    queryFn: () =>
      marketItemApi
        .getMostViewedItems({
          cursor: filter.cursor,
          limit: filter.limit,
          sortBy: "views",
          sortDirection: filter.sortDirection,
        })
        .then((data) => data.data),
  });

  return {
    isMostViewedLoading,
    mostViewedItems,
  };
};

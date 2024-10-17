import { useFilterQuery } from "@/hooks";
import { MarketFilterParams } from "@repo/schemas";

export const useMarketItemFilter = () => {
  const { filter, setFilter } = useFilterQuery<MarketFilterParams>("market", {
    cursor: 0,
    limit: 20,
    sortDirection: "ASC",
  });

  return { filter, setFilter };
};

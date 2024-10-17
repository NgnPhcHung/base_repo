"use client";

import { marketItemService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useFetchItemDetails = () => {
  const marketItemApi = marketItemService();
  const query = useParams();
  const itemId = query?.slug?.[0];

  const { data: itemData, isLoading: isItemLoading } = useQuery({
    queryKey: ["market-item-detail", itemId],
    queryFn: () => marketItemApi.getItem(+itemId!).then((data) => data.data),
    enabled: !!itemId,
  });

  return {
    itemData,
    isItemLoading,
    itemId: Number(itemId || -1),
  };
};

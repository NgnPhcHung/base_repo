import { marketItemService } from "@/services";
import { CartItemUpdatingBody } from "@packages/models";
import { useMutation } from "@tanstack/react-query";

export const useUpdateItem = (id: number) => {
  const marketItemApi = marketItemService();

  const { mutate: updateItemBody } = useMutation({
    mutationKey: ["update-item-qty"],
    mutationFn: async (data: CartItemUpdatingBody) => {},
  });
  const { mutate: updateItemViews } = useMutation({
    mutationKey: ["update-item-view"],
    mutationFn: () => marketItemApi.updateView(id),
  });

  return {
    updateItemBody,
    updateItemViews
  };
};

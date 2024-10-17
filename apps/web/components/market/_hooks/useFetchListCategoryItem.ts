import { marketService } from "@/services";
import { InventoryFilterParams } from "@packages/models";
import { useQuery } from "@tanstack/react-query";

export const useFetchListCategoryItem = (filter: Partial<InventoryFilterParams>) => {
    const marketApi = marketService()

    const { data: categoryItem, isLoading: isItemLoading } = useQuery({
        queryKey: ["list-items", filter],
        queryFn: () => marketApi.getListItems(filter!),
        enabled: !!filter?.categoryId,
    });

    return {
        categoryItem,
        isItemLoading
    }
}
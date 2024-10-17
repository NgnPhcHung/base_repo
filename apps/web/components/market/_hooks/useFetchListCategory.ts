import { marketService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useFetchListCategory = () => {
    const marketApi = marketService()

    const { data: categoryData, isLoading: isCategoryLoading, refetch: refetchCategory } = useQuery({
        queryKey: ["list-category"],
        queryFn: marketApi.getListCategory,
    });

    return {
        categoryData,
        isCategoryLoading,
        refetchCategory
    }
}
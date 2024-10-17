
import { useFilterQuery } from "@/hooks";
import { InventoryFilterParams, InventoryStatus } from "@repo/schemas";

export const useItemFilter = () => {
    const { filter, setFilter } = useFilterQuery<InventoryFilterParams>(
        "market",
        {
            cursor: 0,
            sortDirection: "ASC",
            status: InventoryStatus.Published,
        }
    )

    return { filter, setFilter }
};

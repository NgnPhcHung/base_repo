"use client";

import { Loading } from "@/components";
import { inventoryStatusMapper } from "@/consts";
import { useFilterQuery } from "@/hooks/useFilterQuery";
import { inventoryService } from "@/services/inventoryService";
import { Badge, MantineColor } from "@mantine/core";
import { Inventory, InventoryFilterParams } from "@packages/models";
import { FilteredTable } from "@packages/ui";
import { InventoryStatus } from "@repo/schemas";
import { useQuery } from "@tanstack/react-query";

export const InventoryContainer = () => {
  const { filter, setFilter } = useFilterQuery<InventoryFilterParams>(
    "inventory",
    {
      cursor: 0,
      sortDirection: "ASC",
    }
  );
  const inventoryApi = inventoryService();

  const { data, isLoading } = useQuery({
    queryKey: ["list-inventories", filter],
    queryFn: () => inventoryApi.getInventories(filter),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) return null;
  return (
    <div>
      <FilteredTable<Inventory>
        filteredData={data}
        onFilterChange={setFilter}
        columns={[
          {
            accessor: "id",
            title: "ID",
          },
          {
            accessor: "title",
            title: "Name",
          },
          {
            accessor: "quantity",
            title: "Quantity",
          },
          {
            accessor: "status",
            title: "Status",
            render: (record) => (
              <Badge color={inventoryStatusMapper[record.status]}>
                {record.status}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
};

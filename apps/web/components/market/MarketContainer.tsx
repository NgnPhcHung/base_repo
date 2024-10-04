"use client";

import { inventoryStatusMapper } from "@/consts";
import { useFilterQuery } from "@/hooks";
import { marketService } from "@/services";
import { Badge, Chip, Group } from "@mantine/core";
import { Inventory, InventoryFilterParams } from "@packages/models";
import { FilteredTable } from "@packages/ui";
import { InventoryStatus } from "@repo/schemas";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loading } from "../common";

export const MarketContainer = () => {
  const marketApi = marketService();
  const router = useRouter();

  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["list-category"],
    queryFn: marketApi.getListCategory,
  });

  const { filter, setFilter } = useFilterQuery<InventoryFilterParams>(
    "market",
    {
      cursor: 0,
      sortDirection: "ASC",
      status: InventoryStatus.Published,
      categoryId: categoryData?.data?.[0].id,
    }
  );

  const { data: items } = useQuery({
    queryKey: ["list-items", filter],
    queryFn: () => marketApi.getListItems(filter!),
    enabled: !!filter.categoryId,
  });

  const onSelectCategory = (categoryId: any) => {
    setFilter({ ...filter, categoryId });
  };

  const handleSelectItem = (itemId: number) => {
    router.push(`/market/${itemId}`);
  };

  if (isCategoryLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-[calc(100vw-30rem)] overflow-auto flex items-center space-x-4 mb-4">
        <Chip.Group  value={filter.categoryId?.toString()}>
          <Group justify="center"></Group>
          {categoryData?.data.map((category) => (
            <Chip
              key={category.id}
              value={category.id?.toString()}
              onClick={() => {
                onSelectCategory(category.id);
              }}
            >
              {category.title}
            </Chip>
          ))}
        </Chip.Group>
      </div>
      {!!items && (
        <FilteredTable<Inventory>
          filteredData={items}
          onFilterChange={setFilter}
          onRowClick={({ record }) => handleSelectItem(record.id)}
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
              accessor: "price",
              title: "Price",
              render: (record) => record.price + "$",
            },
          ]}
        />
      )}
    </div>
  );
};

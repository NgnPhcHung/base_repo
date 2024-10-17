"use client";

import { Chip, Group } from "@mantine/core";
import { Loading } from "../common";
import { useFetchListCategory, useItemFilter } from "./_hooks";
import { useEffect } from "react";

export const ListCategory = () => {
  const { filter, setFilter } = useItemFilter();
  const { categoryData, isCategoryLoading } = useFetchListCategory();

  const onSelectCategory = (categoryId: any) => {
    setFilter({ ...filter, categoryId });
  };

  useEffect(() => {
    if (!categoryData) return;

    if (!filter.categoryId) {
      setFilter({ categoryId: categoryData.data[0]?.id });
    }
  }, [categoryData]);

  if (isCategoryLoading) {
    return <Loading />;
  }

  return (
    <div className="w-[calc(100vw-30rem)] overflow-auto flex items-center space-x-4 mb-4">
      <Chip.Group value={filter.categoryId?.toString()}>
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
  );
};

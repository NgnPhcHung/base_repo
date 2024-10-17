"use client";

import { Card, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Loading } from "../common";
import { useFetchListCategoryItem, useItemFilter } from "./_hooks";

export const ListItem = () => {
  const router = useRouter();
  const { filter } = useItemFilter();
  const { categoryItem, isItemLoading } = useFetchListCategoryItem(filter);

  if (isItemLoading) {
    return <Loading />;
  }

  const handleSelectItem = (itemId: number) => {
    router.push(`/market/${itemId}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex gap-x-6 gap-y-4 flex-wrap w-full lg:max-w-[calc(100vw-30rem)]">
        {(categoryItem?.data || []).map((item) => (
          <Card
            key={item.id}
            radius="md"
            withBorder
            w={150}
            h={120}
            onClick={() => handleSelectItem(item.id)}
            className="hover:border-blue-400 cursor-pointer"
          >
            <Card.Section p={16} className="space-y-2">
              <Text fw={600} size="md" className="text-center">
                {item.title
                  .split(" ")
                  .map((item) => item[0])
                  .join("")}
              </Text>
              <Text size="xs" lineClamp={2}>
                {item.description}
              </Text>
              <Text size="md" fw={500} className="text-right">
                {item.price}$
              </Text>
            </Card.Section>
          </Card>
        ))}
      </div>
    </div>
  );
};

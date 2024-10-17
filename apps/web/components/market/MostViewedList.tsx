"use client";

import { useRouter } from "next/navigation";
import { Loading } from "../common";
import { useFetchListMostViewedItems } from "./_hooks";
import { Card, Text } from "@mantine/core";

export const MostViewedList = () => {
  const { mostViewedItems, isMostViewedLoading } =
    useFetchListMostViewedItems();
  const router = useRouter();

  const handleSelectItem = (itemId: number) => {
    router.push(`/market/${itemId}`);
  };
  if (isMostViewedLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-5">
        {(mostViewedItems || []).map((item) => (
          <Card
            key={item.id}
            radius="md"
            withBorder
            w={200}
            h={150}
            onClick={() => handleSelectItem(item.id)}
          >
            <Card.Section p={16} className="space-y-2">
              <Text fw={600} size="md" className="text-center">
                {item.title} (
                {item.title
                  .split(" ")
                  .map((item) => item[0])
                  .join("")}
                )
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

"use client";

import { useFilterQuery } from "@/hooks/useFilterQuery";
import { LocationService } from "@/services";
import { currentUser } from "@/store";
import { Avatar } from "@mantine/core";
import { ProvinceFilterParam } from "@packages/models";
import { AsyncDropdown } from "@packages/ui/src/components/AsyncDropdown";
import { useQuery } from "@tanstack/react-query";

export const UserProfileContainer = () => {
  const { user } = currentUser((state) => ({ user: state.user }));
  const locApi = LocationService();
  const { filter, setFilter } = useFilterQuery<ProvinceFilterParam>("me", {
    limit: 25,
    cursor: 0,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["list-province"],
    queryFn: () =>
      locApi.getListProvince({
        cursor: 0,
        limit: 90,
        sortDirection: "ASC",
        name: "Khanh",
      }),
  });

  return (
    <div>
      <div className="flex items-center space-x-6">
        <Avatar color="blue" size="xl">
          {user?.fullName
            ?.split(" ")
            .map((word) => word[0])
            .join("")}
        </Avatar>
        <p className="font-semibold">{user?.fullName}</p>
      </div>
      <AsyncDropdown
        dataItem={data?.data?.map((province) => ({
          value: province.id.toString(),
          label: province.name,
        }))}
        fetcher={refetch}
        isLoading={isLoading}
      />
    </div>
  );
};

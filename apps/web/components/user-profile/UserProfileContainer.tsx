"use client";
import { LocationService } from "@/services";
import { currentUser } from "@/store";
import { Avatar } from "@mantine/core";
import { AsyncDropdown } from "@packages/ui/src/components/AsyncDropdown";
import { useQuery } from "@tanstack/react-query";

export const UserProfileContainer = () => {
  const { user } = currentUser((state) => ({ user: state.user }));
  const locApi = LocationService();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["list-province"],
    queryFn: locApi.getListProvince,
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

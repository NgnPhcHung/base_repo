import { friendService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common";
import { useFilterQuery } from "@/hooks/useFilterQuery";

export const FriendList = () => {
  const friendApi = friendService();
  const { filter } = useFilterQuery("friend", {
    cursor: 0,
    sortDirection: "ASC",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["list-friend"],
    queryFn: () => friendApi.getListFriend(filter),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-72 h-full">{data && data.map((f) => f.fullName)}</div>
  );
};

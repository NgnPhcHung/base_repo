import { friendService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common";

export const FriendList = () => {
  const friendApi = friendService();

  const { data, isLoading } = useQuery({
    queryKey: ["list-friend"],
    queryFn: friendApi.getList,
  });

  if (isLoading) {
    return <Loading />;
  }

  return <div className="w-72 h-full">
  </div>;
};

import { friendService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common";

export const FriendRequestList = () =>{
    const friendApi = friendService();

    const { data, isLoading } = useQuery({
      queryKey: ["list-friend-requests"],
      queryFn: friendApi.getList,
    });
  
    if (isLoading) {
      return <Loading />;
    }
  
    return <div></div>
}
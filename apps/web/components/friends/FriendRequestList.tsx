"use client";
import { FriendRequestStatus } from "@/consts";
import { useSocket } from "@/providers";
import { friendService } from "@/services";
import { Button } from "@mantine/core";
import { FriendRequestUpdatingBody } from "@repo/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "../common";
import { toast } from "../toast";
import { useFilterQuery } from "@/hooks/useFilterQuery";

export const FriendRequestList = () => {
  const friendApi = friendService();

  const { filter } = useFilterQuery("friend", {
    cursor: 0,
    sortBy: "id",
    sortDirection: "ASC",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["list-friend-requests"],
    queryFn: () => friendApi.getFriendRequestList(filter),
  });

  const { mutate: handleAccept, isPending } = useMutation({
    mutationKey: ["accept-request"],
    mutationFn: async (data: FriendRequestUpdatingBody) => {
      if (!data.receiverId || !data.receiverId) {
        return;
      }
      return await friendApi.acceptRequest(data);
    },
    onSuccess: () => toast.success("You have new friend"),
    onError: () =>
      toast.error("Can not accept this request, please try again!"),
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {data?.data?.map((request) => (
        <div key={request.id} className="flex items-center space-x-2">
          <p>{request.sender.fullName}</p>
          <Button variant="outline">Reject</Button>
          <Button
            onClick={() =>
              handleAccept({
                requestId: request.id,
                receiverId: request.receiver.id,
                senderId: request.sender.id,
                status: FriendRequestStatus.Accepted,
              })
            }
          >
            Accept
          </Button>
        </div>
      ))}
    </div>
  );
};

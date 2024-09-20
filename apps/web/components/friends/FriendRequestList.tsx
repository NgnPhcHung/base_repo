"use client";
import { friendService } from "@/services";
import { Button } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "../common";
import { FriendRequestUpdatingBody } from "@repo/schemas";
import { FriendRequestStatus } from "@/consts";

export const FriendRequestList = () => {
  const friendApi = friendService();

  const { data, isLoading } = useQuery({
    queryKey: ["list-friend-requests"],
    queryFn: friendApi.getFriendRequestList,
  });

  const { mutate: handleAccept, isPending } = useMutation({
    mutationKey: ["accept-request"],
    mutationFn: async (data: FriendRequestUpdatingBody & { id: number }) => {
      if (!data.receiverId || !data.receiverId) {
        return;
      }
      const res: any = await friendApi.acceptRequest(data.id, data);

      // if (res) {
      //   saveToken(res);
      //   router.push("/");
      // }
    },
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
            loading={isPending}
            onClick={() =>
              handleAccept({
                id: request.id,
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


"use client"
import { friendService } from "@/services";
import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common";

export const FriendRequestList = () => {
  const friendApi = friendService();

  const { data, isLoading } = useQuery({
    queryKey: ["list-friend-requests"],
    queryFn: friendApi.getFriendRequestList,
  });

  // const { mutate: handleAccept, isPending } = useMutation({
  //   mutationKey: ["login"],
  //   mutationFn: async (data: FriendRequestUpdatingBody) => {
  //     if (!data.receiverId || !data.receiverId) {
  //       return;
  //     }
  //     const res: any = await friendApi.acceptRequest(data);

  //     // if (res) {
  //     //   saveToken(res);
  //     //   router.push("/");
  //     // }
  //   },
  // });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {data?.data?.map((request) => (
        <div key={request.id} className="flex items-center space-x-2">
          <p>{request.sender.fullName}</p>
          <Button variant="outline">Reject</Button>
          {/* <Button
            loading={isPending}
            onClick={() =>
              handleAccept({
                receiverId: request.receiver.id,
                senderId: request.sender.id,
                status: FriendRequestStatus.Accepted,
              })
            }
          >
            Accept
          </Button> */}
        </div>
      ))}
    </div>
  );
};


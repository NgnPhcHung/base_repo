import { apiService } from "@/apis";
import { currentUser } from "@/store";
import { FriendRequest, Friendship } from "@packages/models";
import { FriendRequestUpdatingBody } from "@repo/schemas";

export const friendService = () => {
  const { user } = currentUser();
  return {
    async getFriendRequestList() {
      return apiService.get<FriendRequest[]>("friends/requests");
    },

    async acceptRequest(payload: FriendRequestUpdatingBody) {
      return apiService.put(`friends/request/${payload.requestId}`, payload);
    },

    async getListFriend() {
      return apiService
        .get<Friendship[]>("friends")
        .then(({ data }) =>
          data?.map((friend) =>
            friend.userOne.id === user?.id ? friend.useTwo : friend.userOne
          )
        );
    },
  };
};

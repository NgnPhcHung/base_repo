import { apiService } from "@/apis";
import { currentUser } from "@/store";
import {
  FriendFilterParams,
  FriendRequest,
  FriendRequestFilterParams,
  Friendship,
} from "@packages/models";
import { FriendRequestUpdatingBody } from "@repo/schemas";

export const friendService = () => {
  const { user } = currentUser();
  return {
    async getFriendRequestList(filter: FriendRequestFilterParams) {
      return apiService.get<FriendRequest[]>("friends/requests",filter);
    },

    async acceptRequest(payload: FriendRequestUpdatingBody) {
      return apiService.put(`friends/request/${payload.requestId}`, payload);
    },

    async getListFriend(filter:FriendFilterParams) {
      return apiService
        .get<Friendship[]>("friends", filter)
        .then(({ data }) =>
          data?.map((friend) =>
            friend.userOne.id === user?.id ? friend.useTwo : friend.userOne
          )
        );
    },
  };
};

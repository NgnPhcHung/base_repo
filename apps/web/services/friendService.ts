import { apiService } from "@/apis";
import { FriendRequest, Friendship } from "@packages/models";
import { FriendRequestUpdatingBody } from "@repo/schemas";

export const friendService = () => {
  return {
    async getFriendRequestList() {
      return apiService.get<FriendRequest[]>("friends/requests");
    },

    async acceptRequest(payload: FriendRequestUpdatingBody) {
      return apiService.put(`friends/request/${payload.requestId}`, payload);
    },

    async getListFriend() {
      return apiService.get<Friendship[]>("friends");
    },
  };
};

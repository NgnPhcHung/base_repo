import { apiService } from "@/apis";
import {
  FriendRequest,
  FriendRequestUpdatingBody,
  Friendship,
} from "@packages/models";

export const friendService = () => {
  return {
    async getFriendRequestList() {
      return apiService.get<FriendRequest[]>("friends/requests");
    },

    async acceptRequest(payload: FriendRequestUpdatingBody) {
      return apiService.put<Friendship[]>("friends/request",payload);
    },
  };
};

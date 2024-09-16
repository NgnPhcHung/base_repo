import { apiService } from "@/apis";

export const friendService = () => {
  return {
    async getList() {
        return apiService.get('friends/requests')
    },
  };
};

import { apiService } from "@/apis";

export const userService = () => {
  return {
    async me() {
      return await apiService.get("users/me");
    },
  };
};

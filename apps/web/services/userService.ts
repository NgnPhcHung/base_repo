import { apiService } from "@/apis";
import { User } from "@packages/models";

export const userService = () => {
  return {
    async me() {
      return await apiService.get("users/me");
    },
    async findUser(username: string) {
      return await apiService.get<User>("users/user", { username });
    },
  };
};

import { apiService } from "@/apis";

export const authService = () => {
  return {
    async login() {
      return await apiService.post("auth", {
        username: "adminUser",
        password: "securePassword123",
      });
    },
  };
};

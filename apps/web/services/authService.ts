import { apiService } from "@/apis";
import { ISingleResult, UserLoginBody } from "@packages/models";

export const authService = () => {
  return {
    async login(
      data: UserLoginBody
    ): Promise<ISingleResult<{ access_token: string }>> {
      return apiService.post("auth", data);
    },
  };
};

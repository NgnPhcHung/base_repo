import { apiService } from "@/apis";
import { ISingleResult } from "@packages/models";
import { UserLoginBody } from "@repo/schemas";


export const authService = () => {
  return {
    async login(
      data: UserLoginBody
    ): Promise<ISingleResult<{ access_token: string }>> {
      return apiService.post("auth", data);
    },
  };
};

import { apiService } from "@/apis";
import { Province } from "@packages/models";

export const LocationService = () => {
  return {
    async getListProvince() {
      return apiService.get<Province[]>("location/provinces");
    },
  };
};

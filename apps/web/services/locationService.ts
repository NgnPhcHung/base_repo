import { apiService } from "@/apis";
import { Province, ProvinceFilterParam } from "@packages/models";

export const LocationService = () => {
  return {
    async getListProvince(payload: ProvinceFilterParam) {
      return apiService.get<Province[]>("location/provinces", payload);
    },
  };
};

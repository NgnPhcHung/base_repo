import { apiService } from "@/apis";
import { Cart, CartCreationBody, CartItemUpdatingBody, SingleResult } from "@packages/models";

export const cartService = () => {
  return {
    async addToCart(payload: CartCreationBody) {
      return apiService.post<SingleResult<Cart>>("/carts/items", payload);
    },
    async updateCartQty(id: number, payload: CartItemUpdatingBody) {
      return apiService.put<SingleResult<Cart>>(`/carts/items/${id}`, payload);
    },
  };
};

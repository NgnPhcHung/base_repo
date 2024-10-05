"use client";

import { ProductDetail } from "@/components";

const ProductDetailPage = () => {
  return <ProductDetail />;
};

export default ProductDetail;
// const { mutate, isPending } = useMutation({
//   mutationKey: ["login"],
//   mutationFn: async (data: UserLoginBody) => {
//     const res: any = await authApi.login(data);

//     if (res) {
//       saveToken(res);
//       router.push("/");
//     }
//   },
// });

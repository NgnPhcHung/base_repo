"use client";

import { Loading } from "@/components";
import { marketService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const query = useParams();
  const itemId = query.slug[0];
  const marketApi = marketService();

  const { data: item, isLoading } = useQuery({
    queryKey: ["market-item-detail", itemId],
    queryFn: () => marketApi.getSelectedItem(Number(itemId)),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{item?.data.title}</h1>
      <p>{item?.data.description}</p>
    </div>
  );
};

export default ProductDetail;

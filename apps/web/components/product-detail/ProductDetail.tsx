"use client";

import { Loading, toast } from "@/components";
import { cartService, orderService } from "@/services";
import { currentUser } from "@/store";
import { ActionIcon, Button, NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { CartCreationBody, CartItemUpdatingBody } from "@packages/models";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const ProductDetail = () => {
  const query = useParams();
  const itemId = query.slug[0];
  const orderApi = orderService();
  const cartApi = cartService();

  const { control, handleSubmit, watch, setValue, getValues, reset } =
    useForm<CartItemUpdatingBody>({
      defaultValues: { quantity: 1 },
      mode: "onChange",
    });
  const { user } = currentUser();
  const quantity = watch("quantity");

  const { data: item, isLoading } = useQuery({
    queryKey: ["market-item-detail", itemId],
    queryFn: () => orderApi.getSelectedItem(Number(itemId)),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async () => {
      if (!item?.data || !user) return;
      console.log(item.data);
      const {
        user: { id: seller },
        id: itemId,
      } = item.data;
      const buyer = user.id;

      const payload: CartCreationBody = {
        buyer,
        seller,
        itemId,
        quantity,
      };
      await cartApi.addToCart(payload);
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: updateItemBody } = useMutation({
    mutationKey: ["update-cart-item-qty"],
    mutationFn: async (data: CartItemUpdatingBody) => {},
  });

  const handleUpdateQty: SubmitHandler<CartItemUpdatingBody> = (data) => {
    updateItemBody(data);
  };
  const handleUpdateQtyDebounce = useDebouncedCallback(handleUpdateQty, 500);
  const changeItemQty = (type: "ins" | "des") => {
    if (type === "des") {
      setValue("quantity", Math.max(0, quantity - 1));
      return;
    }
    setValue("quantity", quantity + 1);
    const formData = getValues();

    handleUpdateQtyDebounce({ ...formData, quantity });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{item?.data.title}</h1>
      <p>{item?.data.description}</p>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleUpdateQtyDebounce)}
      >
        <ActionIcon.Group>
          <ActionIcon onClick={() => changeItemQty("ins")}>
            <IconPlus />
          </ActionIcon>
          <Controller
            control={control}
            name="quantity"
            render={({ field: { value, onChange } }) => (
              <NumberInput value={value} onChange={onChange} />
            )}
          />
          <ActionIcon onClick={() => changeItemQty("des")}>
            <IconMinus />
          </ActionIcon>
        </ActionIcon.Group>

        <Button onClick={() => mutateAsync()} loading={isPending}>
          Add To Cart
        </Button>
      </form>
    </div>
  );
};

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

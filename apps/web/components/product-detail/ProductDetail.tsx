"use client";

import { Loading, toast } from "@/components";
import { cartService } from "@/services";
import { currentUser } from "@/store";
import { ActionIcon, Button, NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { CartCreationBody, CartItemUpdatingBody } from "@packages/models";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useFetchItemDetails, useUpdateItem } from "./_hooks";

export const ProductDetail = () => {
  const query = useParams();
  const cartApi = cartService();

  const { control, handleSubmit, watch, setValue, getValues, reset } =
    useForm<CartItemUpdatingBody>({
      defaultValues: { quantity: 1 },
      mode: "onChange",
    });
  const { user } = currentUser();
  const quantity = watch("quantity");

  const { isItemLoading, itemData, itemId } = useFetchItemDetails();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async () => {
      if (!itemData || !user) return;

      const {
        user: { id: seller },
        id: itemId,
      } = itemData;
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

  const { updateItemBody, updateItemViews } = useUpdateItem(itemId);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      updateItemViews();
    }, 10000);

    return () => clearTimeout(timer);
  }, [itemId]);

  if (isItemLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{itemData?.title}</h1>
      <p>{itemData?.description}</p>
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

"use client";

import { toast, YesNoButton } from "@/components";
import { useSocket } from "@/providers";
import { userService } from "@/services";
import { currentUser } from "@/store";
import { Button, TextInput } from "@mantine/core";
import { User } from "@repo/schemas";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const FindFriend = () => {
  const [isFinding, setIsFinding] = useState(false);
  const [foundUser, setFoundUser] = useState<User>();
  const userApi = userService();
  const { socket } = useSocket();
  const { user } = currentUser((state) => ({ user: state.user }));

  const { register, getValues, reset } = useForm<{ username: string }>();

  const findUser = async () => {
    const username = getValues("username");
    if (username) {
      const foundUser = await userApi.findUser(username);
      setFoundUser(foundUser.data);
    }
  };

  const sendFriendRequest = async () => {
    socket?.emit("sendFriendRequest", {
      receiverId: foundUser?.id,
      senderId: user?.id,
    });
    socket?.on("friendRequestSent", () =>
      toast.success(`Friend request sent to ${foundUser?.fullName}`)
    );
  };

  return (
    <div>
      <div className="text-2xl font-bold">Friends</div>
      <div>
        {isFinding ? (
          <div className="flex space-x-2 items-center">
            <TextInput placeholder="#ID" {...register("username")} />
            <YesNoButton onAccept={findUser} onCancel={reset} />
          </div>
        ) : (
          <Button variant="subtle" onClick={() => setIsFinding(true)}>
            <IconPlus size={16} />
            Find Friend
          </Button>
        )}
      </div>
      <div>
        {foundUser?.username}
        {foundUser ? (
          <div className="flex items-center space-x-2">
            <Button onClick={sendFriendRequest}> sendFriendRequest</Button>
          </div>
        ) : (
          <p className="font-semibold text-gray-500">No any user</p>
        )}
      </div>
    </div>
  );
};

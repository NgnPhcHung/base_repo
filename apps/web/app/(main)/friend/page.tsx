"use client";

import { userService } from "@/services";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function FriendPage() {
  const [isFinding, setIsFinding] = useState(false);
  const [username, setUsername] = useState<string>();
  const userApi = userService();

  const findUser = async () => {
    if (username) {
      const foundUser = await userApi.findUser(username);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold">Friends</div>
      <div>
        {isFinding ? (
          <div className="flex space-x-2 items-center">
            <TextInput
              placeholder="#ID"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <ActionIcon>
              <IconX size={20} />
            </ActionIcon>
            <ActionIcon onClick={findUser}>
              <IconSearch size={20} />
            </ActionIcon>
          </div>
        ) : (
          <Button variant="subtle" onClick={() => setIsFinding(true)}>
            <IconPlus size={16} />
            Find Friend
          </Button>
        )}
      </div>
    </div>
  );
}

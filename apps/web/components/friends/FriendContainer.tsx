import { Tabs } from "@mantine/core";
import { FindFriend } from "./FindFriend";
import { FriendList } from "./FriendList";
import { FriendRequestList } from "./FriendRequestList";

enum TabValue {
  Friends = "Friends",
  Requests = "Requests",
}

export const FriendContainer = () => {
  return (
    <div>
      <FindFriend />
      <Tabs defaultValue={TabValue.Friends}>
        <Tabs.List>
          <Tabs.Tab value={TabValue.Friends}>{TabValue.Friends}</Tabs.Tab>
          <Tabs.Tab value={TabValue.Requests}>{TabValue.Requests}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={TabValue.Friends}>
          <FriendList />
        </Tabs.Panel>

        <Tabs.Panel value={TabValue.Requests}>
          <FriendRequestList />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

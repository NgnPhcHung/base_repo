import { User } from "@packages/models";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Actions {
  setState: (value: Partial<States>) => void;
  setUser: (value: User) => void;
}

interface States {
  sidebarOpen?: boolean;
}
interface UserState {
  user?: User;
}
type Store = Actions & States & UserState;

export const currentUser = create(
  persist<Store>(
    (set, get) => ({
      state: { sidebarOpen: true },
      user: undefined,
      setState: ({ sidebarOpen }) => set({ sidebarOpen }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "currentUser",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

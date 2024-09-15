import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Actions {
  setState: (value: Partial<States>) => void;
}

interface States {
  sidebarOpen?: boolean;
}

type Store = Actions & { state: States };

export const currentUser = create(
  persist<Store>(
    (set, get) => ({
      state: { sidebarOpen: true },
      setState: ({ sidebarOpen }) => set({ state: { sidebarOpen } }),
    }),
    {
      name: "currentUser",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

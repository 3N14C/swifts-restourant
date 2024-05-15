import { User } from "lucia";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ISessionStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useSession = create<ISessionStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        setUser: (user) => set({ user }),
      }),
      { name: "session", storage: createJSONStorage(() => localStorage) }
    )
  )
);

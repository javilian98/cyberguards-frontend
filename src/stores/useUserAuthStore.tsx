import { UserAuth } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserAuthStore = {
  userAuth: UserAuth;
  setUserAuth: (item: UserAuth) => void;
  resetUserAuth: () => void;
};

const initUserAuth = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: 1,
};
export const useUserAuthStore = create<UserAuthStore>()(
  persist(
    (set) => ({
      userAuth: initUserAuth,
      setUserAuth: (item) => set(() => ({ userAuth: item })),
      resetUserAuth: () => set(() => ({ userAuth: initUserAuth })),
    }),
    {
      name: "user-auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

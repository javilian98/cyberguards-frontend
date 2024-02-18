import { UserListItem } from "@/types/types";
import { create } from "zustand";

interface UserStore {
  users: UserListItem[];
  setUsers: (items: UserListItem[]) => void;
  selectedUsers: UserListItem[];
  setSelectedUsers: (items: UserListItem[]) => void;
  currentSelectedUser: UserListItem;
  setCurrentSelectedUser: (item: UserListItem) => void;
  resetCurrentSelectedUser: () => void;
}

const initCurrentSelectedUser: UserListItem = {
  id: "",
  firstName: "",
  lastName: "",
  profession: "",
  riskScore: 0,
  suspectType: 0,
  lastAccessAt: "",
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (items: UserListItem[]) => set(() => ({ users: items })),

  selectedUsers: [],
  setSelectedUsers: (items: UserListItem[]) =>
    set(() => ({ selectedUsers: items })),

  currentSelectedUser: initCurrentSelectedUser,
  setCurrentSelectedUser: (item: UserListItem) =>
    set(() => ({ currentSelectedUser: item })),
  resetCurrentSelectedUser: () =>
    set(() => ({ currentSelectedUser: initCurrentSelectedUser })),
}));

import { create } from "zustand";

interface AlertDialogStore {
  isSingleRowActionDialogOpen: boolean;
  setSingleRowActionDialogOpen: (value: boolean) => void;
  isMultipleRowsActionDialogOpen: boolean;
  setMultipleRowsActionDialogOpen: (value: boolean) => void;
}
export const useAlertDialogStore = create<AlertDialogStore>((set) => ({
  isSingleRowActionDialogOpen: false,
  setSingleRowActionDialogOpen: (value: boolean) => {
    set({
      isSingleRowActionDialogOpen: value,
    });
  },
  isMultipleRowsActionDialogOpen: false,
  setMultipleRowsActionDialogOpen: (value: boolean) => {
    set({
      isMultipleRowsActionDialogOpen: value,
    });
  },
}));

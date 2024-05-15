import { TTableWithReservation } from "@/types/table-types";
import { create } from "zustand";

interface IModalState {
  open: boolean;
  table: TTableWithReservation | null;
  setOpen: (open: boolean) => void;
  setTable: (tableId: TTableWithReservation | null) => void;
}

export const useModal = create<IModalState>((set) => ({
  open: false,
  table: null,
  setOpen: (open) => set({ open }),
  setTable(table) {
    set({ table });
  },
}));

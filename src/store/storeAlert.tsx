import { create } from "zustand";
export type iAlertTypes = "standard" | "error" | "success" | "warning";
export type iAlertData = {
  title: string;
  description?: string;
  cancel?: string;
  action?: {
    label: string;
    onClick: () => void | Promise<void>;
  };
  alertType?: iAlertTypes;
};

export type iAlertStore = {
  open: boolean;
  data: iAlertData;
  showAlert: (value: iAlertData) => void;
  setOpen: (value: boolean) => void;
};

const initialAlertStoreState: iAlertData = {
  title: "",
  description: "",
  cancel: "",
  action: undefined,
  alertType: "standard",
};

export const useAlertStore = create<iAlertStore>((set) => ({
  open: false,
  data: initialAlertStoreState,
  showAlert: (e) => set({ data: e, open: true }),
  setOpen: (e: boolean) => set({ open: e }),
}));

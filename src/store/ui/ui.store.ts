import { create } from "zustand";

interface State {
  isSideMenuOpen: boolean;
  toggleSideMenu: (open?: boolean) => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  toggleSideMenu: (open) =>
    set((state) => ({ isSideMenuOpen: open ?? !state.isSideMenuOpen })),
}));

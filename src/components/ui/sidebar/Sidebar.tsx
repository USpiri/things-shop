"use client";

import { useUIStore } from "@/store";
import clsx from "clsx";
import { Search, X } from "lucide-react";
import { SidebarButtons } from "./SidebarButtons";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const toggleSideMenu = useUIStore((state) => state.toggleSideMenu);

  return (
    <div className="z-20">
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-background opacity-50" />
          <div
            className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[2px]"
            onClick={() => toggleSideMenu(false)}
          />
        </>
      )}

      <nav
        className={clsx(
          "fixed right-0 top-0 w-96 h-screen bg-background border-l border-neutral-700 shadow-xl shadow-black transform transition-all duration-200",
          {
            "translate-x-full": !isSideMenuOpen,
          },
        )}
      >
        <div className="h-12 flex items-center justify-between px-5 mt-3">
          <h3 className="text-lg">Menu</h3>
          <button onClick={() => toggleSideMenu(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <label className="flex items-center gap-2 border rounded-md border-neutral-700 p-2">
            <Search className="w-4 h-4" />
            <input
              className="outline-none flex-1 bg-transparent text-sm font-mono placeholder-neutral-500"
              placeholder="Search..."
            />
          </label>
        </div>
        <div className="py-1 flex flex-col">
          <SidebarButtons />
        </div>
        <div></div>
      </nav>
    </div>
  );
};

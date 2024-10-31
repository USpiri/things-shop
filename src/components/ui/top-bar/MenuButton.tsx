"use client";
import { useUIStore } from "@/store";
import { Menu } from "lucide-react";
import React from "react";

export const MenuButton = () => {
  const toggleSideMenu = useUIStore((state) => state.toggleSideMenu);
  return (
    <button
      onClick={() => toggleSideMenu(true)}
      className="hover:bg-neutral-800/80 p-1.5 rounded active:scale-95 transition-all"
    >
      <Menu className="w-4 h-4" />
    </button>
  );
};

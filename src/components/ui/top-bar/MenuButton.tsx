"use client";
import { useUIStore } from "@/store";
import { Menu } from "lucide-react";
import { Button } from "@/components";

export const MenuButton = () => {
  const toggleSideMenu = useUIStore((state) => state.toggleSideMenu);
  return (
    <Button size="icon" onClick={() => toggleSideMenu(true)}>
      <Menu className="w-4 h-4" />
    </Button>
  );
};

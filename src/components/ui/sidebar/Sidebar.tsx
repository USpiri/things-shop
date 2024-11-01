"use client";
import { useUIStore } from "@/store";
import clsx from "clsx";
import {
  Home,
  LogIn,
  LogOut,
  ReceiptText,
  Search,
  Shirt,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    path: "/",
    label: "Home",
    icon: Home,
  },
  {
    path: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    path: "/orders",
    label: "Orders",
    icon: ReceiptText,
  },
  {
    path: "/auth/login",
    label: "Login",
    icon: LogIn,
  },
  {
    path: "/auth/logout",
    label: "Logout",
    icon: LogOut,
  },
  {
    path: "/products",
    label: "Products",
    icon: Shirt,
  },
  {
    path: "/users",
    label: "Clients",
    icon: Users,
  },
];

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
            <input className="outline-none flex-1 bg-transparent text-sm font-mono" />
          </label>
        </div>
        <div className="py-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className="font-mono group px-4 hover:bg-neutral-800 py-1 font-extralight transition-all tracking-widest flex gap-3 items-center"
            >
              <item.icon className="h-4 w-4 stroke-[1.2] group-hover:stroke-2 transition-all" />
              {item.label}
            </Link>
          ))}
        </div>
        <div></div>
      </nav>
    </div>
  );
};

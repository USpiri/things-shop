import { logout } from "@/actions/auth";
import {
  Home,
  LogIn,
  LogOut,
  ReceiptText,
  Shirt,
  User,
  Users,
} from "lucide-react";
import { Button } from "../button/Button";
import Link from "next/link";
import { useAddressStore, useUIStore } from "@/store";
import { useSession } from "next-auth/react";

const publicMenuItems = [
  {
    path: "/",
    label: "Home",
    icon: Home,
  },
];

const privateMenuItems = [
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
];

const adminMenuItems = [
  {
    path: "/admin/orders",
    label: "All Orders",
    icon: ReceiptText,
  },
  {
    path: "/admin/products",
    label: "Products",
    icon: Shirt,
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: Users,
  },
];

export const SidebarButtons = () => {
  const toggleSideMenu = useUIStore((state) => state.toggleSideMenu);
  const clearAddress = useAddressStore((state) => state.clearAddress);
  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <>
      {publicMenuItems.map((item) => (
        <Button
          key={item.label}
          href={item.path}
          link={!!item.path}
          className="group justify-start rounded-none px-4 py-1.5 tracking-widest gap-3 font-extralight font-mono"
        >
          <item.icon className="h-4 w-4 stroke-[1.2] group-hover:stroke-2 transition-all" />
          {item.label}
        </Button>
      ))}

      {isAuthenticated && (
        <>
          {privateMenuItems.map((item) => (
            <Button
              key={item.label}
              href={item.path}
              link={!!item.path}
              className="group justify-start rounded-none px-4 py-1.5 tracking-widest gap-3 font-extralight font-mono"
            >
              <item.icon className="h-4 w-4 stroke-[1.2] group-hover:stroke-2 transition-all" />
              {item.label}
            </Button>
          ))}
          {isAdmin &&
            adminMenuItems.map((item) => (
              <Button
                key={item.label}
                href={item.path}
                link={!!item.path}
                className="group justify-start rounded-none px-4 py-1.5 tracking-widest gap-3 font-extralight font-mono"
              >
                <item.icon className="h-4 w-4 stroke-[1.2] group-hover:stroke-2 transition-all" />
                {item.label}
              </Button>
            ))}
        </>
      )}

      {isAuthenticated && (
        <Button
          onClick={async () => {
            await logout().then(() => {
              clearAddress();
              window.location.replace("/");
            });
          }}
          className="group justify-start rounded-none px-4 py-1.5 tracking-widest gap-3 font-extralight font-mono"
        >
          <LogOut className="h-4 w-4 stroke-[1.2] group-hover:stroke-2 transition-all" />
          Logout
        </Button>
      )}

      {!isAuthenticated && (
        <Link
          href="/auth/login"
          onClick={() => toggleSideMenu(false)}
          className="active:scale-95 transition-all inline-flex items-center group justify-start rounded-none px-4 py-1.5 tracking-widest gap-3 font-extralight font-mono hover:bg-neutral-800/80"
        >
          <LogIn className="h-4 w-4 stroke-[1.2] group-hover:stroke-2 transition-all" />
          Login
        </Link>
      )}
    </>
  );
};

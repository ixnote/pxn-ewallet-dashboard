"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SideBarItem from "./SideBarItem";
import {
  LayoutDashboard,
  Link as LinkIcon,
  ArrowRightLeft,
  LogOut,
  TicketPercent,
  Home,
  Users,
  Wallet,
  Package2,
  ShoppingCart,
  Phone,
  BookMarked,
  Headphones,
  Settings,
  Bell,
} from "lucide-react";
import { useGeneralContext } from "@/context/GenralContext";
import Link from "next/link";

export const navItemsSuperAdmin = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Vouchers",
    link: "/dashboard/vouchers",
    icon: <TicketPercent />,
  },
  {
    title: "Payment Links",
    link: "/dashboard/payments",
    icon: <LinkIcon />,
  },
  {
    title: "Transactions",
    link: "/dashboard/transactions",
    icon: <ArrowRightLeft />,
  },
];

export const navItemsMdaAdmin = [
  {
    title: "Home",
    link: "/dashboard",
    icon: <Home />,
  },
  {
    title: "Users",
    link: "/dashboard/users",
    icon: <Users />,
  },
  {
    title: "Wallets",
    link: "/dashboard/wallets",
    icon: <Wallet />,
  },
  {
    title: "Orders",
    link: "/dashboard/orders",
    icon: <Package2 />,
  },
  {
    title: "Shop",
    link: "/dashboard/shop",
    icon: <ShoppingCart />,
  },
  {
    title: "Logistics",
    link: "/dashboard/logistics",
    icon: <Phone />,
  },
  {
    title: "Reports and Analytics",
    link: "/dashboard/randa",
    icon: <BookMarked />,
  },
  {
    title: "Notifications",
    link: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    title: "Support Center",
    link: "/dashboard/support",
    icon: <Headphones />,
  },
  {
    title: "Settings",
    link: "/dashboard/settings",
    icon: <Settings />,
  },
];

interface UserContext {
  user?: {
    role?: string;
  };
}

const SideNavBar = () => {
  const { push } = useRouter();
  const { user } = useGeneralContext() as UserContext;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("tokenExpiration");
    push("/login");
  };

  const navBar = user?.role === "super" ? navItemsSuperAdmin : navItemsMdaAdmin;

  return (
    <div className="hidden sticky inset-y-0 w-[256px] h-full border-r-[1px] shadow-xl bg-brand-white md:block">
      <div className="flex flex-col h-screen py-2 gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex gap-2 items-center justify-center w-full font-geist-sans border-b border-brand-ash/30 font-extrabold text-2xl text-brand-main h-16"
          >
            {/* <Image src={logo} alt="Login" width={65} height={22} priority /> */}
            Pxn APP
          </Link>
          <div className="flex flex-col h-full w-full py-2 gap-4 px-1">
            {navBar.map((nav, index) => (
              <SideBarItem
                key={index}
                title={nav.title}
                link={nav.link}
                icon={nav.icon}
              />
            ))}
          </div>
        </div>
        <span
          className="transition-fx flex items-center w-full p-2 py-4 pl-4 gap-3 cursor-pointer font-geistsans font-normal text-sm text-brand-ash border-r-4 border-red-500 hover:bg-red-100 hover:text-red-500 hover:pl-8"
          onClick={() => handleLogout()}
        >
          <span className="text-red-500">
            <LogOut />
          </span>
          Logout
        </span>
      </div>
    </div>
  );
};

export default SideNavBar;

"use client";

import React from "react";
import Link from "next/link";

import SideBarItem from "./SideBarItem";
import { useLogout } from "@/hooks/useAuth";

import {
  Home,
  Users,
  Wallet,
  Package2,
  ShoppingCart,
  Phone,
  BookMarked,
  Headphones,
  Settings,
  LogOut,
  X,
  Bell,
} from "lucide-react";

interface MobileSideNavBarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
  closeSidebar: () => void;
}

const MobileSideNavBar = ({
  isSidebarOpen,
  closeSidebar,
}: MobileSideNavBarProps) => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Use the correct navigation items (same as desktop sidebar)
  const navBar = navItemsMdaAdmin;

  return (
    <div
      className={`md:hidden w-3/4 sm:3/4 fixed top-0 left-0 h-full bg-brand-white border-r-[1px] shadow-xl z-20 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto`}
    >
      <div className="flex flex-col h-screen py-2 gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-2 border-b border-brand-ash/30">
            <Link
              href="/"
              className="flex gap-2 items-center justify-center w-full font-geist-sans font-extrabold text-2xl text-brand-main h-16"
            >
              Pxn APP
            </Link>
            {/* Close Icon */}
            <div className="flex justify-end p-2">
              <button
                onClick={closeSidebar}
                className="text-xl text-brand-ash hover:text-brand-main bg-brand-ashbg p-2 rounded-full transition-fx"
                aria-label="Close Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
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

export default MobileSideNavBar;

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

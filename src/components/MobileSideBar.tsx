"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import SideBarItem from "./SideBarItem";
import { useGeneralContext } from "@/context/GenralContext";

import {
  LayoutDashboard,
  CircleHelp,
  Link as LinkIcon,
  ArrowRightLeft,
  LogOut,
  TicketPercent,
  X,
} from "lucide-react";

interface MobileSideNavBarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
  closeSidebar: () => void;
}

const MobileSideNavBar = ({
  onClose,
  isSidebarOpen,
  closeSidebar,
}: MobileSideNavBarProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { user }: any = useGeneralContext();

  const handleLogout = () => {
    // deleteCookie("auth_token");
    push("/");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userId");
    // dispatch(logout());
    // window.location.reload();
  };

  const navBar = user?.role === "super" ? navItemsSuperAdmin : navItemsMdaAdmin;

  return (
    <div
      className={`md:hidden w-3/4 sm:3/4 fixed top-0 left-0 h-full bg-gray-800 text-white z-20 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto`}
    >
      {/* <div className="flex md:hidden sticky inset-y-0 w-full h-full border-r-[1px] "> */}
      <div className="flex flex-col h-screen py-3 gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-2 border-b-2 border-white/80">
            <Link
              href="/"
              className="flex gap-2 items-center justify-center py-2 px-4 bg-white/75 rounded-md"
            >
              {/* <Image src={logo} alt="Login" width={65} height={22} priority /> */}
              <svg
                width="87"
                height="31"
                viewBox="0 0 87 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1642 20.3831C15.1642 20.8231 15.0783 21.2363 14.9066 21.6226C14.7456 22.009 14.5203 22.347 14.2305 22.6368C13.9515 22.9158 13.6188 23.1412 13.2324 23.3129C12.8461 23.4739 12.4329 23.5544 11.9929 23.5544H3.15518V30.4765H0V6.41016H3.15518V9.30777C3.18738 8.89996 3.2947 8.52434 3.47714 8.18092C3.65958 7.82677 3.89032 7.52091 4.16935 7.26334C4.44838 6.99505 4.77033 6.78577 5.13522 6.63553C5.51084 6.48528 5.90792 6.41016 6.32646 6.41016H11.9929C12.4329 6.41016 12.8461 6.49601 13.2324 6.66772C13.6188 6.8287 13.9515 7.05407 14.2305 7.34383C14.5203 7.62286 14.7456 7.95555 14.9066 8.3419C15.0783 8.72825 15.1642 9.14143 15.1642 9.58144V20.3831ZM11.9929 20.3831V9.58144H3.15518V20.3831H11.9929Z"
                  fill="#1F0047"
                />
                <path
                  d="M20.4443 16.0689C20.4443 15.6289 20.5248 15.2211 20.6858 14.8454C20.8575 14.4591 21.0828 14.121 21.3619 13.8313C21.6516 13.5415 21.9897 13.3161 22.376 13.1552C22.7624 12.9835 23.1702 12.8976 23.5995 12.8976H31.7772V9.58144H21.4263V6.41016H31.7772C32.2172 6.41016 32.6304 6.49601 33.0167 6.66772C33.4031 6.8287 33.7358 7.05407 34.0148 7.34383C34.3046 7.62286 34.5299 7.95555 34.6909 8.3419C34.8626 8.72825 34.9485 9.14143 34.9485 9.58144V23.5544H31.7772V20.6568C31.745 21.0538 31.6377 21.4295 31.4552 21.7836C31.2728 22.1378 31.0367 22.449 30.7469 22.7173C30.4679 22.9749 30.1459 23.1788 29.781 23.329C29.4162 23.4793 29.0298 23.5544 28.622 23.5544H23.5995C23.1702 23.5544 22.7624 23.4739 22.376 23.3129C21.9897 23.1412 21.6516 22.9158 21.3619 22.6368C21.0828 22.347 20.8575 22.009 20.6858 21.6226C20.5248 21.2363 20.4443 20.8231 20.4443 20.3831V16.0689ZM23.5995 20.3831H31.7772V16.0689H23.5995V20.3831Z"
                  fill="#1F0047"
                />
                <path
                  d="M41.4037 30.4765L44.9935 22.009L38.2646 6.41016H41.5969L46.6033 18.2099L51.6098 6.41016H54.942L44.5589 30.4765H41.4037Z"
                  fill="#1F0047"
                />
                <circle cx="71.7397" cy="15.2632" r="15.2632" fill="#1F0047" />
                <path
                  d="M75.4511 20.2077V16.4554H68.3315C67.9148 16.4554 67.5235 16.3794 67.1576 16.2275C66.7917 16.0655 66.4715 15.8528 66.1971 15.5895C65.9329 15.316 65.7194 14.997 65.5568 14.6324C65.4044 14.2678 65.3281 13.8779 65.3281 13.4627V10.0142C65.3281 9.59898 65.4044 9.20906 65.5568 8.84446C65.7194 8.47987 65.9329 8.16591 66.1971 7.90259C66.4715 7.62914 66.7917 7.41646 67.1576 7.26455C67.5235 7.10251 67.9148 7.02148 68.3315 7.02148H77.8294V10.0142H68.3315V13.4627H75.4511C75.8678 13.4627 76.254 13.5437 76.6097 13.7057C76.9756 13.8577 77.2958 14.0703 77.5702 14.3438C77.8446 14.6071 78.0581 14.9211 78.2105 15.2857C78.3731 15.6503 78.4544 16.0402 78.4544 16.4554V20.2077C78.4544 20.6229 78.3731 21.0129 78.2105 21.3775C78.0581 21.7421 77.8446 22.0611 77.5702 22.3345C77.2958 22.5978 76.9756 22.8105 76.6097 22.9726C76.254 23.1245 75.8678 23.2004 75.4511 23.2004H65.3281V20.2077H75.4511Z"
                  fill="white"
                />
              </svg>
            </Link>
            {/* Close Icon */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeSidebar}
                className="text-xl text-white bg-gray-700 p-2 rounded-full"
                aria-label="Close Sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-col h-full w-full py-4 px-1 gap-4">
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
          className="transition-fx flex items-center w-full p-2 py-4 pl-4 gap-3 cursor-pointer font-geistsans font-normal text-sm text-white md:text-black border-r-4 border-red-500 hover:bg-red-100 hover:pl-8"
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
  // {
  //   title: "FAQ",
  //   link: "/dashboard/faqs",
  //   icon: <CircleHelp />,
  // },
];

export const navItemsMdaAdmin = [
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
  // {
  //   title: "FAQ",
  //   link: "/dashboard/faqs",
  //   icon: <CircleHelp />,
  // },
];

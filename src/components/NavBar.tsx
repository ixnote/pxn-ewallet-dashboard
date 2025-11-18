"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { Menu, Bell } from "lucide-react";

import MobileSideNavBar from "./MobileSideBar";
// import { useGeneralContext } from "@/context/GenralContext";
import Image from "next/image";
import user_image from "@/assets/images/nav/user_avatar.png";
import arrow_down from "@/assets/images/nav/arrow_down.png";

const NavBar = () => {
  // const { user }: any = useGeneralContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close Sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOutside = (event: any) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  //to handle Click Outside the sidebar
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | MouseEventInit) => {
      handleClickOutside(event);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleDocumentClick);
    } else {
      document.removeEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={navRef}
      // className="md:ml-[198px] lg:ml-[208px] py-4 fixed inset-x-0 border-b-[0.3px] z-50 bg-brand-ash"
      // className="md:ml-[198px] lg:ml-[214px] xl:ml-[230px] py-4 fixed inset-x-0 border-b-[0.3px] z-50 bg-brand-ashbg shadow h-16"
      className="py-4 inset-x-0 border-b-[0.3px] z-50 bg-brand-ashbg shadow-md h-16"
    >
      <div className="flex px-8 items-center h-full w-full justify-between">
        <div className="flex items-center space-x-4 md:space-x-0">
          <button
            className="flex md:hidden rounded bg-brand-main"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu />
          </button>
          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="w-3/4 sm:3/4 fixed inset-0 z-5"
              onClick={closeSidebar}
            >
              <MobileSideNavBar
                onClose={closeSidebar}
                isSidebarOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
              />
            </div>
          )}
          <span className="flex flex-col items-start justify-start">
            <span className="text-lg text-brand-main font-bold md:text-2xl">
              Dashboard
            </span>
            <span className="font-normal text-sm text-brand-main">
              Welcome Back Sarah!
            </span>
          </span>
        </div>
        <div className="flex items-center gap-12">
          <div className="group relative flex items-end justify-center cursor-pointer">
            <Bell className="text-brand-main text-xl" />
            <div className="absolute -top-3 -right-3 bg-red-500 rounded-full text-brand-white w-6 h-6 p-3 flex items-center justify-center font-semibold text-[13px] group-hover:animate-bounce">
              4
            </div>
          </div>
          <div className="flex gap-6 items-center justify-between">
            <div className="relative flex gap-4 justify-center items-center w-9 h-9">
              <Image src={user_image} alt="avr" />
              <div className="absolute top-0 -right-1 bg-green-500 rounded-full p-[5px] flex items-center justify-center border-1 border-brand-ash"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-normal text-sm text-brand-main">
                Sarah Sarina
              </span>
              <span className="font-normal text-sm text-brand-ash">
                Administrator
              </span>
            </div>
            <Image
              src={arrow_down}
              alt="#"
              className="cursor-pointer hover:animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

"use client";

import React, { MouseEvent, useEffect, useRef, useState, useMemo } from "react";
import { Menu, Bell, User } from "lucide-react";
import Link from "next/link";

import MobileSideNavBar from "./MobileSideBar";
import Image from "next/image";
import arrow_down from "@/assets/images/nav/arrow_down.png";
import { useCurrentUser } from "@/hooks/useUsers";
import {
  useNotifications,
  useUpdateNotification,
} from "@/hooks/useNotifications";

const NavBar = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: notificationsData } = useNotifications();
  const updateNotification = useUpdateNotification();

  // Get user name and role from current user data
  const userName = useMemo(() => {
    if (currentUser?.firstName && currentUser?.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return currentUser?.username || "Admin";
  }, [currentUser]);

  const userRole = useMemo(() => {
    if (!currentUser?.roles || currentUser.roles.length === 0) {
      return "Administrator";
    }

    // Prefer "admin" if it exists in the array, otherwise use the first item
    if (currentUser.roles.includes("admin")) {
      return "Administrator";
    } else if (currentUser.roles.includes("super")) {
      return "Super Admin";
    } else {
      // Capitalize the first letter of the first role
      const firstRole = currentUser.roles[0];
      return firstRole.charAt(0).toUpperCase() + firstRole.slice(1);
    }
  }, [currentUser]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  // Get notifications and unread count
  const notifications = notificationsData?.data?.notifications || [];
  const unreadCount = notifications.filter((n) => n.status === "unread").length;
  const recentNotifications = notifications.slice(0, 5); // Show last 5 notifications

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close Sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  const navRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNotificationClick = (notificationId: string) => {
    if (
      notifications.find((n) => n._id === notificationId)?.status === "unread"
    ) {
      updateNotification.mutate({ notificationId, status: "read" });
    }
    setIsNotificationDropdownOpen(false);
  };

  //to handle Click Outside the sidebar
  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      const target = event.target as Node | null;
      if (navRef.current && target && !navRef.current.contains(target)) {
        setIsOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        target &&
        !notificationDropdownRef.current.contains(target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
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
              Welcome Back {userName}!
            </span>
          </span>
        </div>
        <div className="flex items-center gap-12">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationDropdownRef}>
            <button
              onClick={() =>
                setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
              }
              className="group relative flex items-end justify-center cursor-pointer"
            >
              <Bell className="text-brand-main text-xl" />
              {unreadCount > 0 && (
                <div className="absolute -top-3 -right-3 bg-red-500 rounded-full text-brand-white w-6 h-6 p-3 flex items-center justify-center font-semibold text-[13px] group-hover:animate-bounce">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-brand-white rounded-lg shadow-xl border border-brand-ash/20 z-50 max-h-[500px] overflow-y-auto">
                <div className="p-4 border-b border-brand-ash/20 flex items-center justify-between">
                  <h3 className="font-semibold text-brand-dark">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-brand-ash">
                      {unreadCount} unread
                    </span>
                  )}
                </div>

                {recentNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-brand-ash/50 mx-auto mb-2" />
                    <p className="text-sm text-brand-ash">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-brand-ash/20">
                    {recentNotifications.map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() =>
                          handleNotificationClick(notification._id)
                        }
                        className={`p-4 hover:bg-brand-ashbg/50 cursor-pointer transition-fx ${
                          notification.status === "unread"
                            ? "bg-brand-main/5"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.status === "unread"
                                ? "bg-brand-main"
                                : "bg-transparent"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium text-sm mb-1 truncate ${
                                notification.status === "unread"
                                  ? "text-brand-dark"
                                  : "text-brand-ash"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-xs text-brand-ash line-clamp-2">
                              {notification.body}
                            </p>
                            <p className="text-xs text-brand-ash mt-1">
                              {new Date(
                                notification.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 border-t border-brand-ash/20">
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setIsNotificationDropdownOpen(false)}
                    className="block w-full text-center text-sm text-brand-main hover:text-brand-main/80 font-medium py-2 hover:bg-brand-ashbg/50 rounded-lg transition-fx"
                  >
                    See all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-6 items-center justify-between">
            <div className="relative flex gap-4 justify-center items-center w-9 h-9">
              {currentUser?.avatar ? (
                <Image
                  src={currentUser.avatar}
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-brand-main/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-main" />
                </div>
              )}
              {currentUser?.isOnline && (
                <div className="absolute top-0 -right-1 bg-green-500 rounded-full p-[5px] flex items-center justify-center border-1 border-brand-ash"></div>
              )}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="font-normal text-sm text-brand-main">
                {userName}
              </span>
              <span className="font-normal text-sm text-brand-ash">
                {userRole}
              </span>
            </div>
            <Image
              src={arrow_down}
              alt="#"
              className="hidden md:block cursor-pointer hover:animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

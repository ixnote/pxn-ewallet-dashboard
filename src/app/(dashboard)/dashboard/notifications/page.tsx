"use client";

import React, { useState } from "react";
import { Bell, Check, CheckCheck, Send, X } from "lucide-react";
import {
  useNotifications,
  useUpdateNotification,
  useOpenAllNotifications,
  useCreateBroadcast,
} from "@/hooks/useNotifications";
import Spinner from "@/components/spinner/Spinner";
import { success, error } from "@/helpers/Alert";

const NotificationsPage = () => {
  const {
    data: notificationsData,
    isLoading,
    error: fetchError,
  } = useNotifications();
  const updateNotification = useUpdateNotification();
  const openAllNotifications = useOpenAllNotifications();
  const createBroadcast = useCreateBroadcast();

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    title: "",
    body: "",
    isDraft: false,
  });

  const notifications = notificationsData?.data?.notifications || [];
  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const handleMarkAsRead = (notificationId: string) => {
    updateNotification.mutate(
      { notificationId, status: "read" },
      {
        onSuccess: () => {
          success("Notification marked as read");
        },
      }
    );
  };

  const handleMarkAsUnread = (notificationId: string) => {
    updateNotification.mutate(
      { notificationId, status: "unread" },
      {
        onSuccess: () => {
          success("Notification marked as unread");
        },
      }
    );
  };

  const handleMarkAllAsRead = () => {
    openAllNotifications.mutate(undefined, {
      onSuccess: () => {
        success("All notifications marked as read");
      },
      onError: (err: unknown) => {
        const errorMessage =
          err && typeof err === "object" && "response" in err
            ? (err.response as { data?: { message?: string } })?.data?.message
            : undefined;
        error(errorMessage || "Failed to mark all as read");
      },
    });
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.body) {
      error("Please fill in both title and body");
      return;
    }

    createBroadcast.mutate(broadcastForm, {
      onSuccess: () => {
        success("Broadcast created successfully");
        setShowBroadcastModal(false);
        setBroadcastForm({ title: "", body: "", isDraft: false });
      },
      onError: (err: unknown) => {
        const errorMessage =
          err && typeof err === "object" && "response" in err
            ? (err.response as { data?: { message?: string } })?.data?.message
            : undefined;
        error(errorMessage || "Failed to create broadcast");
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading notifications: {fetchError.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-main/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-start justify-start pb-8">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-brand-main">Notifications</h1>
          <p className="text-sm text-brand-ash">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount > 1 ? "s" : ""
                }`
              : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={openAllNotifications.isPending}
              className="group border-1 border-brand-main rounded-lg px-4 py-2 cursor-pointer text-sm font-normal flex items-center text-brand-main gap-2 hover:bg-brand-main disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="group-hover:text-brand-white">
                {openAllNotifications.isPending
                  ? "Marking..."
                  : "Mark All as Read"}
              </span>
            </button>
          )}
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="group bg-brand-main rounded-lg px-4 py-2 cursor-pointer text-sm font-normal flex items-center text-brand-white gap-2 hover:bg-brand-main/90"
          >
            <Send className="w-4 h-4" />
            <span>Send Broadcast</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="w-full bg-brand-white rounded-xl shadow-lg overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-16 h-16 text-brand-ash/50 mx-auto mb-4" />
            <p className="text-brand-ash text-lg">No notifications yet</p>
            <p className="text-brand-ash text-sm mt-2">
              You&apos;re all caught up!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-brand-ash/20">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-6 hover:bg-brand-ashbg/50 transition-fx ${
                  notification.status === "unread" ? "bg-brand-main/5" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className={`font-semibold text-base ${
                          notification.status === "unread"
                            ? "text-brand-dark"
                            : "text-brand-ash"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {notification.status === "unread" && (
                        <span className="w-2 h-2 bg-brand-main rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-brand-ash mb-2">
                      {notification.body}
                    </p>
                    <p className="text-xs text-brand-ash">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {notification.status === "unread" ? (
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        disabled={updateNotification.isPending}
                        className="p-2 text-brand-ash hover:text-brand-main hover:bg-brand-ashbg rounded-lg transition-fx disabled:opacity-50"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsUnread(notification._id)}
                        disabled={updateNotification.isPending}
                        className="p-2 text-brand-ash hover:text-brand-main hover:bg-brand-ashbg rounded-lg transition-fx disabled:opacity-50"
                        title="Mark as unread"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-brand-ash/45 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-xl shadow-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-brand-main">
                Send Broadcast
              </h2>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="text-brand-ash hover:text-brand-main transition-fx"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={handleBroadcastSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-brand-dark mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={broadcastForm.title}
                  onChange={(e) =>
                    setBroadcastForm({
                      ...broadcastForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-brand-ash/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent"
                  placeholder="Enter notification title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-brand-dark mb-2"
                >
                  Body *
                </label>
                <textarea
                  id="body"
                  value={broadcastForm.body}
                  onChange={(e) =>
                    setBroadcastForm({ ...broadcastForm, body: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-brand-ash/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent"
                  placeholder="Enter notification body"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDraft"
                  checked={broadcastForm.isDraft}
                  onChange={(e) =>
                    setBroadcastForm({
                      ...broadcastForm,
                      isDraft: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-brand-main border-brand-ash/30 rounded focus:ring-brand-main"
                />
                <label htmlFor="isDraft" className="text-sm text-brand-ash">
                  Save as draft
                </label>
              </div>
              <div className="flex items-center gap-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 border border-brand-ash/30 rounded-lg text-brand-dark hover:bg-brand-ashbg transition-fx"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBroadcast.isPending}
                  className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-main/90 transition-fx disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createBroadcast.isPending ? "Sending..." : "Send Broadcast"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

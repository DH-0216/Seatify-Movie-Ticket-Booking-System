"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { usePathname } from "next/navigation";
import { user, sidebarItems } from "@/utils";

const AdminSideBar = ({ selectedSection, setSelectedSection }) => {
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className={`h-[calc(100vh-64px)] flex flex-col items-center pt-8
      ${isSidebarOpen ? "max-w-60 w-full" : "max-w-16 w-16"}
      border-r border-gray-300/20 text-sm
      transition-all duration-300 ease-in-out
    `}
    >
      <Image
        src={user.Imageurl}
        alt="sidebar"
        className={`rounded-full mx-auto transition-all duration-300 ${
          isSidebarOpen ? "h-14 w-14" : "h-9 w-9"
        }`}
      />
      {isSidebarOpen && (
        <p className="mt-2 text-base text-white transition-opacity duration-300">
          {user.FirstName} {user.LastName}
        </p>
      )}

      <div className="space-y-2">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = selectedSection === item.id;
            return (
            <button
              key={index}
              onClick={() => setSelectedSection(item.id)}
              className={`relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 pr-4
              ${
                isActive
                ? isSidebarOpen
                  ? "text-red-500 bg-red-500/10 border-r-4 border-red-500"
                  : "text-red-500"
                : isSidebarOpen
                ? "text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:border-r-4 hover:border-red-500 transition-colors duration-200"
                : "text-gray-400 hover:text-red-500 transition-colors duration-200"
              } group`}
            >
              <span
              className={`flex items-center justify-center ${
                !isSidebarOpen && isActive
                ? "text-red-500 bg-red-500/10 border-r-4 border-red-500 mr-4"
                : ""
              } p-2`}
              >
              <IconComponent size={20} />
              </span>
              {isSidebarOpen && (
              <span className="font-medium">{item.label}</span>
              )}
            </button>
            );
        })}
      </div>
    </div>
  );
};

export default AdminSideBar;
